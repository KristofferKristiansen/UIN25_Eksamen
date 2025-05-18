export const events = {
  name: 'event',
  title: 'Event',
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
      name: "socialLinks",
      title: "Sosiale lenker",
      type: "object",
      fields:     [
        { name: "instagram", title: "Instagram", type: "url" },
        { name: "facebook", title: "Facebook", type: "url" },
        { name: "x", title: "X (Twitter)", type: "url" }
      ]
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
