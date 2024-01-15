// Write your code here
import './index.css'

const RepositoryItem = props => {
  const {repositoryItemDetails} = props
  const {
    avatarUrl,
    name,
    starsCount,
    forksCount,
    issuesCount,
  } = repositoryItemDetails

  return (
    <li className="repository-card">
      <img src={avatarUrl} alt={name} height="50px" width="50px" />
      <h1 className="name"> {name} </h1>
      <div className="a">
        <img
          src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
          alt="stars"
          height="10px"
          width="10px"
          className="image"
        />
        <p className="span">
          {starsCount}
          stars
        </p>
      </div>
      <div className="a">
        <img
          src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png "
          alt="forks"
          height="10px"
          width="10px"
          className="image"
        />
        <p className="span">
          {forksCount}
          forks
        </p>
      </div>
      <div className="a">
        <img
          src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png "
          alt="open issues"
          height="10px"
          width="10px"
          className="image"
        />
        <p className="span">
          {issuesCount}
          open issues
        </p>
      </div>
    </li>
  )
}

export default RepositoryItem
