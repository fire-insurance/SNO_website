import React, { useState } from 'react'
import LinkButton from "../../components/LinkButton/LinkButton"
import DefaultButton, { ButtonStyles, ButtonTypes } from '../../components/DefaultButton/DefaultButton'
import NewsList from "../../components/News/NewsList/NewsList";
import styles from './AdminNewsPage.module.scss'
import searchIcon from '../../assets/img/search.svg'
import plusIcon from '../../assets/img/plus.svg'
import settingsIcon from '../../assets/img/settings.svg'

const AdminNewsPage = () => {
    const [isTagsModalVisible, setIsTagsModalVisible] = useState<boolean>(false)

    return (
        <>
            <header className={styles.header}>
                <div className={styles.search}>
                    <img src={searchIcon} alt="Поиск" />
                    <input type="text" placeholder="Введите название новости" />
                </div>
                <div className={styles.btns}>
                    <DefaultButton
                        text={'Управление тегами'}
                        imgSrc={settingsIcon}
                        style={ButtonStyles.outlined}
                        type={ButtonTypes.button}
                        extraClass={styles.AdminOutlinedButton}/>
                    <LinkButton
                        text={'Добавить новость'}
                        imgSrc={plusIcon}
                        to={'/admin/news/add'} />
                </div>
            </header>
            <NewsList count={10} page={1} isAdmin={true} />
        </>
    )
}

export default AdminNewsPage