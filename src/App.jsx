import { QueryClientProvider,QueryClient } from 'react-query'
import { Contributors } from './Contributors'

const queryClient = new QueryClient()


function App() {

  return (
    <QueryClientProvider client={queryClient}>
     <Contributors/>
    </QueryClientProvider>
  )
}

export default App
