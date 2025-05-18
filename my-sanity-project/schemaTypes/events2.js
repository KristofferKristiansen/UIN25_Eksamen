export const events2 = {
  name: 'event2',
  title: 'Event2',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Tittel på arrangementet',
      type: 'string'
    },
    {
      name: "slug",
      title: "URL",
      type: "slug",
      options: {
        source: "title",
        maxLength: 50
      }
    },
    {
      name: 'apiId',
      title: 'API-ID',
      type: 'string',
      description: 'ID hentet fra Ticketmaster sitt API'
    },
    {
      name: 'category',
      title: 'Kategori',
      type: 'string',
      options: {
        list: ['Sport', 'Show', 'Festival']
      }
    }
  ]
};