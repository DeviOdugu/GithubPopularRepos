import {Component} from 'react'
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import LanguageFilterItem from '../LanguageFilterItem'
import RepositoryItem from '../RepositoryItem'
import './index.css'

const apiStatus = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  inProgress: 'IN_PROGRESS',
  failure: 'FAILURE',
}

const languageFiltersData = [
  {
    id: 'ALL',
    language: 'All',
  },
  {
    id: 'JAVASCRIPT',
    language: 'Javascript',
  },
  {
    id: 'RUBY',
    language: 'Ruby',
  },
  {
    id: 'JAVA',
    language: 'Java',
  },
  {
    id: 'CSS',
    language: 'CSS',
  },
]

// Write your code here
class GithubPopularRepos extends Component {
  state = {
    activeLanguageFilterId: languageFiltersData[0].id,
    repositoryList: [],
    apiStatusResult: apiStatus.initial,
  }

  componentDidMount() {
    this.getRepositoryData()
  }

  getRepositoryData = async () => {
    const {activeLanguageFilterId} = this.state
    const url = `https://apis.ccbp.in/popular-repos?language=${activeLanguageFilterId}`

    this.setState({
      apiStatusResult: apiStatus.inProgress,
    })

    const response = await fetch(url)
    // console.log('res', response)
    const repositoryData = await response.json()
    // console.log(repositoryData)
    if (response.ok === true) {
      const getData = repositoryData.popular_repos.map(eachData => ({
        id: eachData.id,
        avatarUrl: eachData.avatar_url,
        name: eachData.name,
        starsCount: eachData.stars_count,
        forksCount: eachData.forks_count,
        issuesCount: eachData.issues_count,
      }))
      // console.log('get', getData)

      this.setState({
        repositoryList: getData,
        apiStatusResult: apiStatus.success,
      })
    } else {
      this.setState({
        apiStatusResult: apiStatus.failure,
      })
    }
  }

  loadingView = () => (
    <div data-testid="loader">
      <Loader
        type="ThreeDots"
        color="#0284c7"
        height="80px"
        width="80px"
        className="l"
      />
    </div>
  )

  successView = () => {
    const {repositoryList} = this.state
    return (
      <ul className="repository-list">
        {repositoryList.map(eachItem => (
          <RepositoryItem key={eachItem.id} repositoryItemDetails={eachItem} />
        ))}
      </ul>
    )
  }

  failureView = () => (
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
        height="100px"
        width="100px"
      />
      <h1> Something Went Wrong </h1>{' '}
    </div>
  )

  getApiStatusResult = () => {
    const {apiStatusResult} = this.state
    switch (apiStatusResult) {
      case apiStatus.success:
        return this.successView()
      case apiStatus.inProgress:
        return this.loadingView()
      case apiStatus.failure:
        return this.failureView()
      default:
        return null
    }
  }

  activeLanguage = activeLanguageFilterId => {
    this.setState(
      {
        activeLanguageFilterId,
      },
      this.getRepositoryData,
    )
  }

  render() {
    const {activeLanguageFilterId} = this.state
    return (
      <div className="card-container">
        <h1 className="main-heading"> Popular </h1>
        <ul className="language-list">
          {languageFiltersData.map(eachLanguage => (
            <LanguageFilterItem
              key={eachLanguage.id}
              languageFilterItemDetails={eachLanguage}
              isActive={eachLanguage.id === activeLanguageFilterId}
              activeLanguage={this.activeLanguage}
            />
          ))}
        </ul>
        {this.getApiStatusResult()}
      </div>
    )
  }
}

export default GithubPopularRepos
