import dayjs from 'dayjs'

export default function formatDatesForRequest (form, entityClass) {
  Object.keys(form).forEach(key => {
    // If is an instance of Date, format
    if (form[key] instanceof Date) {
      form[key] = dayjs(form[key]).unix()
      return form
    }

    if (!entityClass.dates) {
      return form
    }

    // If is a number, assume timestamp and return
    if (typeof form[key] == 'number') {
      return form
    }

    // If is included in dates on entity, format
    if (entityClass.dates.includes(key)) {
      form[key] = dayjs(form[key], ['DD/MM/YYYY', 'MM/YYYY', 'YYYY'], 'en-au', true)
        .unix()
    }
  })

  return form
}