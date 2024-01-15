// Write your code here
import './index.css'

const LanguageFilterItem = props => {
  const {languageFilterItemDetails, activeLanguage, isActive} = props
  const {id, language} = languageFilterItemDetails

  const activeLanguageStyle = isActive
    ? 'after-active-language'
    : 'before-active-language'

  const onClickLanguage = () => {
    activeLanguage(id)
  }

  return (
    <li>
      <button
        type="button"
        className={activeLanguageStyle}
        onClick={onClickLanguage}
      >
        {language}
      </button>
    </li>
  )
}

export default LanguageFilterItem
