namespace $ {

	$mol_style_define( $bog_feedback2_board, {

		Menu: {
			flex: {
				basis: '24rem',
				grow: 0,
			},
		},

		Project_link: {
			justifyContent: 'space-between',
			gap: $mol_gap.text,
		},

		Project_note: {
			color: $mol_theme.shade,
			flex: {
				shrink: 0,
			},
			font: {
				size: '0.85rem',
			},
		},

		Registry_note: {
			color: $mol_theme.shade,
			font: {
				size: '0.85rem',
			},
			padding: $mol_gap.text,
			overflowWrap: 'anywhere',
		},

		Placeholder: {
			color: $mol_theme.shade,
			flex: {
				grow: 1,
				shrink: 1,
				basis: '20rem',
			},
			padding: $mol_gap.block,
		},

		Projects_empty: {
			color: $mol_theme.shade,
			padding: $mol_gap.block,
		},

	} )

	$mol_style_define( $bog_feedback2_board_project, {

		flex: {
			basis: '40rem',
		},

		Entries: {
			padding: $mol_gap.block,
			gap: $mol_gap.block,
		},

		Entry: {
			background: {
				color: $mol_theme.card,
			},
			border: {
				radius: $mol_gap.round,
			},
			boxShadow: `0 0 0 1px ${ $mol_theme.line }`,
			padding: $mol_gap.block,
			Head: {
				font: {
					size: '1rem',
				},
			},
		},

		Entry_text: {
			whiteSpace: 'pre-wrap',
		},

		Entry_reply: {
			background: {
				color: $mol_theme.back,
			},
			border: {
				radius: $mol_gap.round,
			},
			margin: {
				top: $mol_gap.space,
			},
			padding: $mol_gap.block,
			whiteSpace: 'pre-wrap',
		},

		Lands_note: {
			color: $mol_theme.shade,
			font: {
				size: '0.85rem',
			},
			padding: $mol_gap.text,
			overflowWrap: 'anywhere',
		},

		Entries_empty: {
			color: $mol_theme.shade,
			padding: $mol_gap.block,
		},

		Lands_missing: {
			color: $mol_theme.shade,
			padding: $mol_gap.block,
		},

	} )

}
