namespace $.$$ {

	// Дашборд ничего не пишет и живёт на gh-pages, где собственный origin мастером
	// быть не может. Ставим прод-мастера первыми, чтобы не жечь провальный реконнект
	// на каждом открытии. Пиры из bundled seed остаются запасным вариантом.
	$giper_baza_yard.masters_default.splice(
		0,
		$giper_baza_yard.masters_default.length,
		... $bog_feedback2_masters,
	)

	/** Реестр: feedback_id → ссылка на ленд с отзывами. */
	const Registry_dict = $giper_baza_dict_to( $giper_baza_atom_text )

	/** Ленд одного проекта: lord автора → его отзыв. */
	const Entries_dict = $giper_baza_dict_to( $bog_feedback2_entry )

	export class $bog_feedback2_board extends $.$bog_feedback2_board {

		/** Тот же реестр, что у виджета; `?registry=<link>` смотрит в чужой. */
		registry_link() {
			return this.$.$mol_state_arg.value( 'registry' ) || $bog_feedback2_registry
		}

		registry_land() {
			return this.$.$giper_baza_glob.Land( new $giper_baza_link( this.registry_link() ) )
		}

		registry_dict() {
			return this.registry_land().Data( Registry_dict )
		}

		/** Все feedback_id, зарегистрированные виджетом отзывов. */
		@ $mol_mem
		project_ids(): readonly string[] {
			return ( this.registry_dict().keys() ?? [] ).map( key => String( key ) ).sort()
		}

		project() {
			return this.$.$mol_state_arg.value( 'project' ) ?? ''
		}

		pages() {
			return [
				this.Menu(),
				... this.project() ? [ this.Project() ] : [],
			]
		}

		// Подсказка «выбери проект» занимает остаток книги, поэтому убираем её,
		// как только открыта страница проекта.
		placeholders() {
			return this.project() ? [] : super.placeholders()
		}

		menu_body() {
			if( !this.project_ids().length ) return [ this.Projects_empty() ]
			return [ this.Projects() ]
		}

		project_rows() {
			return this.project_ids().map( ( _, index )=> this.Project_link( index ) )
		}

		project_id( index: number ) {
			return this.project_ids()[ index ] ?? ''
		}

		project_name( index: number ) {
			return this.project_id( index )
		}

		project_note( index: number ) {
			const links = this.land_links( this.project_id( index ) )
			if( !links.length ) return 'нет ленда'
			const count = links.reduce( ( sum, link )=> sum + this.entries_count( link ), 0 )
			const forked = links.length > 1 ? ` · лендов: ${ links.length }` : ''
			return `отзывов: ${ count }${ forked }`
		}

		/**
		 * Все ссылки на ленды, когда-либо записанные в реестр для проекта.
		 *
		 * Указатель — атом, и `val()` отдаёт только победителя. Но виджет заводит
		 * ленд, если указателя ещё нет, а на холодном кеше «пусто» и «не доехало»
		 * неотличимы — второй посетитель форкает ленд и перетирает указатель.
		 * Юниты проигравших пиров при этом никуда не деваются, поэтому читаем их
		 * все: иначе отзывы из форкнутого ленда просто исчезают из виду.
		 */
		@ $mol_mem_key
		land_links( project_id: string ): readonly string[] {
			if( !project_id ) return []
			const pointer = this.registry_dict().key( project_id )
			if( !pointer ) return []
			const land = this.registry_land()
			const links = pointer.units_of( null )
				.map( unit => land.sand_decode( unit ) )
				.filter( ( link ): link is string => typeof link === 'string' && link !== '' )
			return [ ... new Set( links ) ]
		}

		entries_count( land_link: string ) {
			if( !land_link ) return 0
			const land = this.$.$giper_baza_glob.Land( new $giper_baza_link( land_link ) )
			return ( land.Data( Entries_dict ).keys() ?? [] ).length
		}

		project_land_links() {
			return this.land_links( this.project() )
		}

		registry_note() {
			return `реестр ${ this.registry_link() } · проектов: ${ this.project_ids().length }`
		}

	}

	export class $bog_feedback2_board_project extends $.$bog_feedback2_board_project {

		entries_dict( land_link: string ) {
			return this.$.$giper_baza_glob.Land( new $giper_baza_link( land_link ) ).Data( Entries_dict )
		}

		/** Пары «ленд, автор» для всех отзывов проекта, свежие сверху. */
		@ $mol_mem
		refs(): readonly ( readonly [ land: string, lord: string ] )[] {
			const dated = [] as [ string, string, number ][]
			for( const land_link of this.land_links() ) {
				const dict = this.entries_dict( land_link )
				for( const key of dict.keys() ?? [] ) {
					const lord = String( key )
					const moment = dict.key( lord )?.last_change()
					dated.push([ land_link, lord, moment ? moment.valueOf() : 0 ])
				}
			}
			return dated
				.sort( ( left, right )=> right[2] - left[2] )
				.map( ([ land_link, lord ])=> [ land_link, lord ] as const )
		}

		project_body() {
			if( !this.land_links().length ) return [ this.Lands_missing() ]
			if( !this.refs().length ) return [ this.Entries_empty() ]
			return [ this.Entries() ]
		}

		entry_rows() {
			return this.refs().map( ( _, index )=> this.Entry( index ) )
		}

		entry( index: number ) {
			const ref = this.refs()[ index ]
			if( !ref ) return null
			return this.entries_dict( ref[0] ).key( ref[1] ) ?? null
		}

		entry_title( index: number ) {
			const ref = this.refs()[ index ]
			if( !ref ) return ''
			const entry = this.entry( index )
			const contact = entry?.Contact()?.val() || `аноним ${ ref[1].slice( 0, 8 ) }`
			const moment = entry?.last_change()
			return moment ? `${ contact } · ${ moment.toString( 'YYYY-MM-DD hh:mm' ) }` : String( contact )
		}

		entry_text( index: number ) {
			return this.entry( index )?.Text()?.val() ?? ''
		}

		entry_reply( index: number ) {
			const reply = this.entry( index )?.Reply()?.val()
			return reply ? `**Ответ:** ${ reply }` : ''
		}

		entry_content( index: number ) {
			return [
				this.Entry_text( index ),
				... this.entry_reply( index ) ? [ this.Entry_reply( index ) ] : [],
			]
		}

		lands_note() {
			const links = this.land_links()
			if( !links.length ) return ''
			return `ленд${ links.length > 1 ? 'ы' : '' } ${ links.join( ', ' ) }`
		}

	}

}
