import SearchProvider from './context/context'
import Dropdown from './dropdown/Dropdown'
import Form from './form/Form'
import SearchBar from './form/SearchBar'
import { SearchProps } from './types'

const Search = ({ children, setTodos }: SearchProps) => {
  return <SearchProvider setTodos={setTodos}>{children}</SearchProvider>
}

Search.Form = Form
Search.SearchBar = SearchBar
Search.Dropdown = Dropdown

export default Search
