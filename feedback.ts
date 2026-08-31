namespace $ {

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
