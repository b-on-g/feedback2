namespace $ {

	/**
	 * Рабочие baza-мастера экосистемы bog. Bundled seed (`giper/baza/dump.baza`)
	 * помнит в том числе мёртвые адреса, поэтому актуальные добавляем явно —
	 * виджет отзывов должен работать в любом приложении без своего boot-кода.
	 *
	 * Имя мастера привязано к IP по схеме `<owner>-<country>-<size>.<IP>.ip.giper.dev`.
	 * Серверы переименованы 25.08.2026, и на 87.120 перед Базой стоит SNI-relay:
	 * запрос с НЕИЗВЕСТНЫМ именем уезжает на подставной сайт и отдаёт чужой
	 * сертификат. Поэтому старое имя `baza.87.120.36.150.ip.giper.dev` не просто
	 * мертво — оно роняет TLS-рукопожатие WebSocket'а, и клиент висит на реконнектах.
	 */
	export const $bog_feedback2_masters = [
		'https://cmyser-ru-mule.91.188.212.151.ip.giper.dev/',
		'https://cmyser-bg-pony.87.120.36.150.ip.giper.dev/',
	]

	/** @deprecated Один мастер мало, бери весь список. */
	export const $bog_feedback2_master = $bog_feedback2_masters[ 0 ]

	for( const master of $bog_feedback2_masters ) {
		if( $giper_baza_yard.masters_default.includes( master ) ) continue
		$giper_baza_yard.masters_default.push( master )
	}

	/**
	 * Ленд-реестр: feedback_id → ссылка на ленд с отзывами этого проекта.
	 * Пресет `[null, post('just')]` — ленд нового проекта заводит первый
	 * отправитель отзыва, заход владельца не нужен.
	 */
	export const $bog_feedback2_registry = 'c0FEYfG8_tUFJEKfo'

	/** Отдельный отзыв пользователя. Ключ в dict — lord string. */
	export class $bog_feedback2_entry extends $giper_baza_dict.with({
		Text: $giper_baza_atom_text,
		Contact: $giper_baza_atom_text,
		Reply: $giper_baza_atom_text,
		Reply_author: $giper_baza_atom_text,
		Reply_created: $giper_baza_atom_real,
	}) {}

}
