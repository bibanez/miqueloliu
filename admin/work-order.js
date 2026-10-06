/* A lower order puts a work first without changing any other record. */
(() => {
  const { CMS, h, createClass } = window;
  // Include earlier clicks so several new drafts in this session stay in order.
  let sessionMinimum = 0;
  CMS.registerWidget('work-order', createClass({
    getInitialState() { return { busy: false, message: '' }; },
    isValid() {
      return Number.isSafeInteger(this.props.value)
        || { error: { message: 'Escriviu un nombre enter vàlid.' } };
    },
    async placeFirst() {
      this.setState({ busy: true, message: '' });
      try {
        const response = await fetch('/admin/work-order.json', { cache: 'no-store' });
        if (!response.ok) throw new Error('Catalogue unavailable');
        const { orders } = await response.json();
        if (!Array.isArray(orders) || !orders.every(Number.isSafeInteger)) throw new Error('Invalid orders');
        // Taking the minimum across all sections also works if the category changes.
        const current = Number.isSafeInteger(this.props.value) ? this.props.value : 0;
        const next = orders.reduce((min, order) => Math.min(min, order), Math.min(0, current, sessionMinimum)) - 1;
        if (!Number.isSafeInteger(next)) throw new Error('Order out of range');
        sessionMinimum = next;
        this.props.onChange(next);
        this.setState({ message: 'L’obra se situarà al principi de la secció quan la publiqueu.' });
      } catch {
        this.setState({ message: 'No s’ha pogut consultar el catàleg. Torneu-ho a provar o escriviu l’ordre manualment.' });
      } finally {
        this.setState({ busy: false });
      }
    },
    render() {
      return h('div', {},
        h('input', {
          id: this.props.forID,
          className: this.props.classNameWrapper,
          type: 'number', step: 1, value: this.props.value ?? '',
          onChange: event => {
            const text = event.target.value;
            this.props.onChange(text === '' ? undefined : Number(text));
            this.setState({ message: '' });
          },
        }),
        h('button', {
          type: 'button', disabled: this.state.busy, onClick: this.placeFirst,
          style: { marginTop: '8px', padding: '10px 14px', cursor: 'pointer' },
        }, this.state.busy ? 'Consultant el catàleg…' : 'Posa al principi de la secció'),
        h('p', { role: 'status', style: { margin: '8px 0 0' } }, this.state.message));
    },
  }));
})();
