import { createClient } from '@sanity/client';

const client = createClient({
  projectId: '23xgcjk9',     
  dataset: 'production',     
  useCdn: true,              
  apiVersion: 'v2025-05-17',  
});

export default client;