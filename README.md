# 1. 프로젝트

원티드 프론트엔드 인턴십 4주차 과제 <br>
구현 목표: 기존 코드 리펙토링 및 추천 기능 구현, 문서화

배포링크: https://pre-onboarding-10th-4-6.vercel.app/

## 팀원목록

- 팀장 : 이정진
- 팀원 : 곽현지, 김성주, 박재욱, 신종우, 양주영, 이원형, 정다솔, 정예지


| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;팀6&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; | &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;이정진&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; | &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;곽현지&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; | 김성주 | 박재욱 |
| :---: | :---: | :---: | :---: | :---: |
| 역할 | ![Leader](https://img.shields.io/badge/-%ED%8C%80%EC%9E%A5-blue) | ![팀원](https://img.shields.io/badge/-%ED%8C%80%EC%9B%90-yellow) | ![팀원](https://img.shields.io/badge/-%ED%8C%80%EC%9B%90-yellow) | ![팀원](https://img.shields.io/badge/-%ED%8C%80%EC%9B%90-yellow) | ![팀원](https://img.shields.io/badge/-%ED%8C%80%EC%9B%90-yellow) |
| Github | [wjdrk70](https://github.com/wjdrk70) | [hjKwak](https://github.com/KwakHyeonJi) | [dev-seongjoo](https://github.com/dev-seongjoo) | [LeChuckbb](https://github.com/LeChuckbb) | [jw3215](https://github.com/jw3215) 

| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;신종우&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; | &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;양주영&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; | 이원형 | &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;정다솔&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; | &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;정예지&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; |
| :---: | :---: | :---: | :---: | :---: |
| ![팀원](https://img.shields.io/badge/-%ED%8C%80%EC%9B%90-yellow) | ![팀원](https://img.shields.io/badge/-%ED%8C%80%EC%9B%90-yellow) | ![팀원](https://img.shields.io/badge/-%ED%8C%80%EC%9B%90-yellow) | ![팀원](https://img.shields.io/badge/-%ED%8C%80%EC%9B%90-yellow) | ![팀원](https://img.shields.io/badge/-%ED%8C%80%EC%9B%90-yellow)
 | [jw3215](https://github.com/jw3215) | [yangddu](https://github.com/yangddu) | [WonhyeongLee](https://github.com/WonhyeongLee) | [ssori0421](https://github.com/ssori0421) | [sabit1997](https://github.com/sabit1997) |

<br />

<br />

# 2. 협업 방식

- 각자 기능 구현 후 코드 발표 진행
- 발표 후, 각자 코드 리뷰하며 코드 베이스 선정
- 선정된 코드 베이스에서 각 팀원의 좋은 코드를 취합해서 작성
- 비즈니스 로직 및 view 를 개선하여 PR 진행 후 merge

[git commit message 규칙 설정]

- 일관된 커밋 메시지의 형태로 가독성을 높이고, 팀원들의 작업 내역 및 변경사항 쉽게 파악 가능

<br />

# 3. 디렉토리 구조

```
📦
├─ src
│  ├─ axiosClient
│  ├─ components
│  ├─ context
│  ├─ error
│  ├─ hooks
│  ├─ pages
│  └─ service
```

<br />

# 3. 구현 내용

### 1) Dropdown 추천 검색어 표시

`Dropdown` 컴포넌트는 검색어를 입력하면 입력한 텍스트를 기반으로 추천 검색어 목록을 제공한다.

`useEffect` 훅은 `keyword`의 변경을 감지하고 `keyword`가 변경되면, 검색 결과를 초기화하고 새로운 검색어를 기반으로 검색을 시작한다. `addResults` 함수는 주어진 검색어를 이용하여 검색 작업을 수행하고 결과를 상태에 추가한다. 최종적으로 `useSearchState`에 저장된 추천 검색어 목록을 가져와서 `Dropdown` 컴포넌트에 렌더링이 이루어진다.

```tsx
const Dropdown = ({
  keyword,
  isSearching,
  resetInput,
  changeStatus,
  isDropdownVisible
}: DropdownProps) => {
  const { results, isEnd } = useSearchState()
  const { add: addResults, reset } = useSearchDispatch()

  ...

  useEffect(() => {
    const fetch = async () => {
      changeStatus(StatusTypes.SEARCHING)
      await addResults(keyword)
      changeStatus(StatusTypes.IDLE)
    }

    reset()
    keyword && fetch()
  }, [keyword])

  return isDropdownVisible && results.length ? (
    <DropdownLayout ref={infiniteScrollRef}>
      {results.map(result => (
        <DropdownItem key={result} onClick={() => handleAddTodo(result)}>
          {keyword.length ? (
            <ColoredKeyword text={result} keyword={keyword} />
          ) : (
            result
          )}
        </DropdownItem>
      ))}
      <DropdownOption>
        {isSearching ? <Spinner /> : !isEnd && <FaEllipsisH />}
      </DropdownOption>
    </DropdownLayout>
  ) : (
    <></>
  )
}
```

<br />

### 2) 검색 API 호출 Debounce 적용

`useDebounce` 훅은 검색어(keyword)를 입력받아 해당 검색어를 delay 시간동안 기다린 후, 그 검색어를 `debouncedValue`에 저장하여 반환한다.

이렇게 `debouncedValue`을 사용하면 사용자가 검색어를 계속해서 입력할 때마다 API 요청을 보내지 않고, 일정 시간 동안 검색어 입력이 멈춘 뒤에 API 요청을 보내게 된다. 이렇게 함으로써 API 호출 횟수를 제한할 수 있다.

`useDebounce` 훅은 `useState`와 `useEffect`를 사용하여, value와 delay가 바뀔 때마다 타이머를 초기화하고, delay 시간이 지난 후에 value를 `debouncedValue`에 저장하여 반환한다.

```ts
import { useState, useEffect } from 'react'

const useDebounce = <T>(value: T, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(timer)
    }
  }, [value, delay])

  return debouncedValue
}

export default useDebounce
```

```ts
const debouncedValue = useDebounce(value, DEBOUNCE_DELAY)
```

<br />

### 3) Infinite scroll

`useInfiniteScroll` 커스텀 훅을 사용하여 스크롤 위치를 감지하여 필요한 동작을 수행하고, 스크롤 가능 여부를 제어하여 적절한 시점에 데이터를 더 불러오거나 처리한다.

훅 내부에서는 `containerRef.current`를 사용하여 컨테이너 엘리먼트를 참조한다. `handleScroll` 콜백 함수는 현재 스크롤 위치와 컨테이너의 높이, 스크롤 가능 여부를 확인하여 스크롤이 페이지 하단에 도달했을 때 `onScrollEnd`를 호출하고 `canScroll` 상태를 `false`로 설정한다.

`containerRef.current`가 존재하는 경우에는 컨테이너 엘리먼트의 scroll 이벤트 리스너를 추가하고, 컴포넌트가 언마운트되거나 컨테이너 엘리먼트가 변경될 때 이벤트 리스너를 제거하는 클린업 함수를 반환한다.

마지막으로, containerRef를 반환하여 컴포넌트에서 컨테이너 엘리먼트에 Ref를 적용할 수 있도록 한다.

> #### Debug
>
> - `scrollTop` 과 `clientHeight`을 더한 값이 `scrollHeight` 보다 같거나 큰 경우 스크롤을 끝까지 한 것으로 판별하고, API fetching 후, 을 추가
> - 특정 해상도 및 화면 배율에서는 추가로 API fetching을 하지 못하는 것을 확인
> - 소수점 오차로 인한 버그 (ex. 99.99999 + 100 >= 200)
> - `Math.ceil()`로 소수점 올림하여 버그 수정

```ts
const useInfiniteScroll = <T extends HTMLElement>(
  onScrollEnd: () => void,
  length: number
) => {
  const [canScroll, setCanScroll] = useState(true)
  const containerRef = useRef<T | null>(null)

  useEffect(() => {
    const container = containerRef.current

    const handleScroll = () => {
      if (!container) {
        return
      }

      const { scrollHeight, scrollTop, clientHeight } = container
      if (canScroll && Math.ceil(scrollTop + clientHeight) >= scrollHeight) {
        onScrollEnd()
        setCanScroll(false)
      }
    }

    if (container) {
      container.addEventListener('scroll', handleScroll)

      return () => {
        if (container) {
          container.removeEventListener('scroll', handleScroll)
        }
      }
    }
  }, [canScroll, onScrollEnd])

  useEffect(() => {
    setCanScroll(true)
  }, [length])

  return containerRef
}
```

```tsx
  const infiniteScrollRef = useInfiniteScroll<HTMLUListElement>(
    addMore,
    results.length
  )

  ...

  return isDropdownVisible && results.length ? (
    <DropdownLayout ref={infiniteScrollRef}>
      {results.map(result => (
        <DropdownItem key={result} onClick={() => handleAddTodo(result)}>
          {keyword.length ? (
            <ColoredKeyword text={result} keyword={keyword} />
          ) : (
            result
          )}
        </DropdownItem>
      ))}
      <DropdownOption>
        {isSearching ? <Spinner /> : !isEnd && <FaEllipsisH />}
      </DropdownOption>
    </DropdownLayout>
  ) : (
    <></>
  )
```

<br />

### 4) 검색어 하이라이트

`ColoredKeyword` 컴포넌트는 전체 텍스트(`text`)와 검색어(`keyword`)를 받아서 검색어 부분이 하이라이트된 텍스트 문자열을 렌더링한다.

먼저, `RegExp` 객체를 생성하여 검색어에 대한 정규 표현식을 만든다.

다음으로, 검색어를 기준으로 텍스트를 분할하고, 이 결과를 `words` 배열에 저장한다. `exec` 메소드는 매칭되는 텍스트와 그 인덱스 정보를 제공하므로, 이를 이용해 원본 텍스트에서 검색어 부분을 따로 추출하고 `origins` 배열에 저장한다.

마지막으로, `words` 배열을 순회하면서 각 단어를 렌더링한다. 이때 `split`한 결과 배열의 첫 번째 원소는 빈 문자열이거나, `keyword`가 아닌 문자열이기 때문에, 첫번째 단어가 아니라면 `origins` 배열에서 해당 검색어를 가져와 색상을 입힌 `Keyword` 컴포넌트로 표시하고, 그 뒤에 분리된 단어를 붙인다.

```tsx
const ColoredKeyword = ({ text, keyword }: ColoredKeywordProps) => {
  const regex = new RegExp(keyword, 'gi')
  const words = text.split(regex)
  const origins: string[] = []

  let match
  while ((match = regex.exec(text)) !== null) {
    origins.push(match[0])
    text = text.slice(match.index + keyword.length)
  }

  return (
    <>
      {words.map((word, index) =>
        index > 0 ? (
          <span key={word + index}>
            <Keyword>{origins[index - 1]}</Keyword>
            {word}
          </span>
        ) : (
          <span key={word + index}>{word}</span>
        )
      )}
    </>
  )
}

const Keyword = styled.span`
  color: #2bc9ba;
`
```

<br />

### 5) Dropdown에서 아이템 선택 시 input 초기화 후 Todo에 추가

Dropdown 컴포넌트에서 클릭 하면 addTodo 호출하도록 handleAddTodo 함수를 구현해 사용

```ts
// Dropdown.tsx
const handleAddTodo = async (title: string) => {
  try {
    changeStatus(StatusTypes.SAVING)
    await addTodo({ title })
    resetInput()
  } catch (error) {
    console.error(error)
    alert('Something went wrong.')
  } finally {
    changeStatus(StatusTypes.IDLE)
  }
}
```

list 내의 아이템을 클릭 시 handleAddTodo를 해당 아이템의 값을 인자로 호출

```tsx
{
  results.map(result => (
    <DropdownItem key={result} onClick={() => handleAddTodo(result)}>
      <ColoredKeyword text={result} keyword={keyword} />
    </DropdownItem>
  ))
}
```

추가로 요구사항 대로 아이템을 click 시 색상이 변하도록 구현

```css
const DropdownItem = styled.li`
  ...

  &:active {
    background: #d5f4f1;
  }
`
```

<br />

### 6) 관심사의 분리

api 호출 관련 로직들을 Class 단위로 분리하여 모듈화

```ts
class AxiosClient {
  constructor(baseURL: string, token: string) {...}
  get(url: string, config?: AxiosRequestConfig) {...}
  delete(url: string, config?: AxiosRequestConfig) {...}
  post(url: string, data: unknown, config?: AxiosRequestConfig) {...}
}
```

```ts
class TodoService {
  constructor(apiRequest: AxiosClient) {...}
  async get() {...}
  async create(todo: { title: string }) {...}
  async delete(id: string) {...}
}
```

```ts
class SearchService {
  constructor(apiRequest: AxiosClient) {...}
  async get(q: string, page = 1, limit = 10) {...}
}
```

의존성 주입

```ts
const axiosClient = new AxiosClient(
  process.env.REACT_APP_API_URL || '',
  process.env.REACT_APP_TOKEN || ''
)
const todoService = new TodoService(axiosClient)
const searchService = new SearchService(axiosClient)
```

<br />

### 7) ContextAPI로 state 공유

```ts
interface Todo {
  id: string
  title: string
}

type TodoState = Todo[]
```

```ts
type SearchState = { results: string[]; isEnd: boolean }
// results: dropdown에 표시될 검색 결과 리스트
// isEnd: api에서 받아올 수 있는 모든 검색 결과를 저장했는지 체크
```

```tsx
// index.tsx
...
<TodoProvider todoService={todoService}>
  <SearchProvider searchService={searchService}>
    <App />
  </SearchProvider>
</TodoProvider>
...
```

<br />

### 8) Error Boundary를 이용한 에러 처리

컴포넌트 트리 상단에 `ApiErrorBoundary` 컴포넌트를 두어 하위 컴포넌트에서 throw된 모든 에러를 catch한다. 에러처리는 에러 상황에 맞는 페이지를 화면에 보여주는 방식으로 구현하였다.

모든 API 호출부를 `useTryCatchError` 훅으로 감싸서 API 호출 시 발생한 에러가 `ApiErrorBoundary`로 전파될 수 있도록 throw한다.
`getDerivedStateFromError` 에 HttpError 가 들어오면 `hasError` 와 `statusCode` 를 반환하여 `401`,`404`,`500` 으로 분기해서 반화하여 에러페이지를 보여준다.

```tsx
...
ReactDOM.render(
  <StrictMode>
    <ApiErrorBoundary>
      <TodoProvider todoService={todoService}>
        <SearchProvider searchService={searchService}>
          <App />
        </SearchProvider>
      </TodoProvider>
    </ApiErrorBoundary>
  </StrictMode>,
  document.getElementById('root')
)
...
```

```ts
const useTryCatchErrorHandling = <T extends unknown[]>(
  callback: (...rest: T) => Promise<void>
) => {
  const [_, setState] = useState()

  return async (...args: T) => {
    try {
      await callback(...args)
    } catch (e: any) {
      // ErrorBoundary로 Promise, event handler 에러를 throw 하기위한 hack
      setState(() => {
        throw e
      })
    }
  }
}
```

```tsx
class ApiErrorBoundary extends React.Component<
  ApiErrorBoundaryProps,
  ApiErroBoundaryState
> {
  constructor(props: ApiErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): ApiErroBoundaryState {
    const statusCode = error instanceof HttpError ? error.statusCode : undefined

    return { hasError: true, statusCode }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    console.error(error, errorInfo)
  }

  render() {
    const { hasError, statusCode } = this.state

    if (hasError) {
      switch (statusCode) {
        case 401:
          return <h1>인증되지 않은 사용자 입니다.</h1>
        case 404:
          return <h1>페이지를 찾을 수 없습니다. </h1>
        case 500:
          return <h1>서버 오류</h1>

        default:
          return <h1>Error!!!!</h1>
      }
    }
    return this.props.children
  }
}
```

<br />

### 9) E2E Test

`cypress` 를 이용하여 e2e test 를 진행하였다.
test case 는 3개의 case를 두었고
1.fixture 에 mock data 로 'lorem' 을 검색시 의 `length` 를 비교 검증
2.'lorem' 검색후 `scrollTo` 후 `length` 가 추가 되어있는지 검증
3.dropdown item 을 클릭시 todo list 에 추가되었는지 검증

```ts
describe('Search', () => {
  before(() => {
    cy.visit('/')
  })

  it('should display dropdown items length', () => {
    cy.intercept('GET', '**/search**', { fixture: 'searchResult.json' }).as(
      'searchRequest'
    )

    cy.get('[data-cy="search-input"]').type('lorem')

    cy.wait('@searchRequest')

    cy.get('[data-cy="dropdown-item"]').should('have.length', 10)
  })

  it('should load more results on scroll', () => {
    cy.visit('/')

    cy.get('[data-cy="search-input"]').type('lorem')

    cy.get('[data-cy="dropdown-item"]').should('have.length', 10)

    cy.get('[data-cy="search-dropdown"]').scrollTo('bottom')

    cy.get('[data-cy="dropdown-item"]').should('have.length.greaterThan', 9)
  })

  it('should add selected item to todo list', () => {
    cy.visit('/')

    cy.get('[data-cy="search-input"]').type('lorem')

    cy.get('[data-cy="dropdown-item"]').first().click()

    cy.get('[data-cy="todo-item"]')
      .its('length')
      .then(length => {
        cy.log(`Todo list length after adding: ${length}`)

        cy.wrap(length).should('eq', length)
      })
  })
})
```

<br >

# 5. 설치 & 실행 방법

```node
yarn
yarn start

or

npm i --force || --legacy-peer-deps
npm start
```

<br />

# 6. 기술 스택

<img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=black">
<img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=TypeScript&logoColor=black">
<img src="https://img.shields.io/badge/axios-5A29E4?style=for-the-badge&logo=axios&logoColor=black">
<img src="https://img.shields.io/badge/vercel-000000?style=for-the-badge&logo=vercel&logoColor=white">
<img src="https://img.shields.io/badge/eslint-4B32C3?style=for-the-badge&logo=eslint&logoColor=black">
<img src="https://img.shields.io/badge/prettier-F7B93E?style=for-the-badge&logo=prettier&logoColor=black">
<img src="https://img.shields.io/badge/styledcomponents-DB7093?style=for-the-badge&logo=styledcomponents&logoColor=black">
<img src="https://img.shields.io/badge/husky-E0E0E0?style=for-the-badge&logo=husky&logoColor=black">
