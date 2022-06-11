import { SearchBtn, SearchInput, SearchWrap } from '../styles/navbar'
import SearchIcon from '@mui/icons-material/Search'
import { useState } from 'react'
import { useRouter } from 'next/router'

export default function SearchProduct() {
  const router = useRouter()
  const [value, setValue] = useState('')

  function handleChange(e) {
    setValue(e.target.value)
  }
  function search() {
    setValue('')
    router.push(`/products?name=${value}`)
  }
  function handleKeyDown(e) {
    if (e.keyCode === 13) {
      e.preventDefault()
      search()
    }
  }

  return (
    <form>
      <SearchWrap>
        <SearchInput
          placeholder="search product"
          name="search"
          type="text"
          autoComplete="off"
          value={value}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
        <SearchBtn onClick={search}>
          <SearchIcon />
        </SearchBtn>
      </SearchWrap>
    </form>
  )
}
