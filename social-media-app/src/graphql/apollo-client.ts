import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://yslqtolhmghvihdtgthn.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlzbHF0b2xobWdodmloZHRndGhuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzE3NTYyOTEsImV4cCI6MjA0NzMzMjI5MX0.8ZdgoUnxSTsTiB60F4Bmry2NYhrFZqXmIqm4Ifvw4fw' // Replace with your actual anon key

const supabaseServiceRole = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlzbHF0b2xobWdodmloZHRndGhuIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTczMTc1NjI5MSwiZXhwIjoyMDQ3MzMyMjkxfQ.lzBB16dRKSt2vVN0O6VmYxIzC8XvJJcmandz-og92Fk"

export const supabase = createClient(supabaseUrl, supabaseServiceRole)

export const client = new ApolloClient({
  uri: `${supabaseUrl}/graphql/v1`,
  headers: {
    "Content-Type": "application/json",
    apiKey:  supabaseAnonKey,
  },
  cache: new InMemoryCache()
})