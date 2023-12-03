const requiredMixin = {
  props: {
    readonly: { type: Boolean, default: false },
    id: { type: String, default: "" },
    show: { type: Boolean, default: true },
    required: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    label: { type: String, default: "" },
    value: { type: String | null, default: null },
    title: { type: String, default: "" },
    prepend: { type: String, default: null },
    append: { type: String, default: null },
    col: { type: String, default: "12,12,12,12" },
    maxlength: { type: Number, default: null },
    minlength: { type: Number, default: null },
    vruntime: { type: Function, default: null },
    showError: { type: Boolean, default: true },
    showMaxLength: { type: Boolean, default: false },
    inputClass: { type: String, default: "" },
    defaultValue: { default: null },
    type: { type: String, default: 'text' }
  },
  data() {
    return {
      d_value: !!this.value ? this.defaultValue : this.value,
      d_show: this.show,
      d_disabled: this.disabled,
      d_xxs: 0,
      d_sm: 0,
      d_md: 0,
      d_lg: 0,
      d_errors: [],
      d_typed: false,
      addedStyle: "",
    };
  },
  methods: {
    fSplitColumns() {
      const cols = this.col.split(",");
      this.d_xxs = cols.length > 0 ? cols[0].trim() : 0;
      this.d_sm = cols.length > 1 ? cols[1].trim() : 0;
      this.d_md = cols.length > 2 ? cols[2].trim() : 0;
      this.d_lg = cols.length > 3 ? cols[3].trim() : 0;
    },
    clearError() {
      this.d_errors = [];
    },
    validate() {
      this.clearError();

      if ((!this.d_value || this.d_value === "") && this.required) {
        this.d_errors.push(`${this.label} required`);
      } else if (
        this.d_value &&
        this.maxlength &&
        this.value.length > this.maxlength
      ) {
        this.d_errors.push(`${this.label} too long`);
      }

      return !this.hasError;
    },
    fInput() {
      this.d_typed = true;
      this.$emit("input", this.d_value);
      this.validate();
    },
    fBlur() {
      this.$emit("blur", this.d_value);
      this.validate();
    },
    fKeyup() {
      this.$emit("keyup", this.d_value);
    },
  },
  computed: {
    fState() {
      return this.d_typed ? this.d_errors.length === 0 : null;
    },
    hasError() {
      return this.d_errors.length > 0;
    },
  },
  created () {
    this.fSplitColumns()
  },
  watch: {
    value (n, o) {
      this.d_value = n
    }
  }
}

export default requiredMixin;
