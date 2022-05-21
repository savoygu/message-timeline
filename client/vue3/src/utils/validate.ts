// type ValidateType = 'empty' | 'length' | 'range' | 'regexp'
export enum ValidateType {
  EMPTY = 'empty',
  LENGTH = 'length',
  RANGE = 'range',
  REGEXP = 'regexp'
}

type Range = [number, number]
type ValidateData = number | RegExp | [number, number]
type ValidateItem = ValidateType | [ValidateType, ValidateData]
type ValidateParams<T> = {
  field: keyof T
  desc: string
  validates: ValidateItem[]
}
type ValidateFn = (
  val: string,
  desc: string,
  validate?: number | Range | RegExp
) => string | undefined

export const validator: Record<ValidateType, ValidateFn> = {
  [ValidateType.EMPTY]: (val, desc) => {
    if (!val) return `${desc}不能为空`
  },
  [ValidateType.LENGTH]: (val, desc, length) => {
    if (val.length > length!) return `${desc}长度不能超过${length}`
  },
  [ValidateType.RANGE]: (val, desc, range) => {
    const [s, e] = range as Range
    if (val.length < s || val.length > e)
      return `${desc}长度只能在${s}-${e}之间`
  },
  [ValidateType.REGEXP]: (val, desc, regexp) => {
    if (!(regexp as RegExp).test(val)) return `${desc}格式不正确`
  }
}

const validate = <T>(
  form: Record<keyof T, any>,
  { field, desc, validates }: ValidateParams<T>
) => {
  let invalid: boolean | string | undefined = false
  const val = form[field]
  for (const validate of validates) {
    if (typeof validate === 'string') {
      invalid = validator[validate](val, desc)
    } else if (Array.isArray(validate)) {
      const [type, range] = validate
      invalid = validator[type](val, desc, range)
    }

    if (invalid) break
  }
  return invalid
}

export default validate
