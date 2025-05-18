{/*Java kode for sanity. For de ulike brukerene for nettstedet*/}
export const users = {
  name: 'user',
  title: 'Bruker',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Navn',
      type: 'string'
    },
    {
      name: 'slug',
      title: 'URL',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 50
      }
    },
    {
      name: 'gender',
      title: 'Kjønn',
      type: 'string',
      options: {
        list: ['Mann', 'Kvinne', 'Annet']
      }
    },
    {
      name: 'age',
      title: 'Alder',
      type: 'number'
    },
    {
      name: 'image',
      title: 'Bilde',
      type: 'image'
    },
    {
      name: 'previousPurchases',
      title: 'Tidligere kjøp',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'event' }] }]
    },
    {
      name: 'wishlist',
      title: 'Ønskeliste',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'event' }] }]
    },
    {
      name: 'friends',
      title: 'Venner',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'user' }] }]
    }
  ]
};
