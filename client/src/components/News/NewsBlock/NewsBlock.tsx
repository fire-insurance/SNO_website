import React, {useState, useEffect, FC} from "react";
import cn from "classnames"
import http from "../../assets/http-config";
import NewsPreview from "./NewsPreview/NewsPreview";
import mockImg from "../../assets/img/hdfhdhdfjhdf.jpeg"
import styles from "./NewsBlock.module.scss"
import DefaultButton, { ButtonStyles, ButtonTypes } from "../DefaultButton/DefaultButton";

interface NewsBlockProps {
    count: number
    page: number
}

const NewsBlock: FC<NewsBlockProps> = ({ count, page }) => {
    const [news, setNews] = useState<any[]>([])

    useEffect(() => {
        const fetchNews = async () => {
            const response = await http.get(`/news?page=1&count=4`)
            return response;
        }

        fetchNews()
            .then(response => {
                if (response.status === 200) {
                    setNews(response.data)
                }
            })
    }, [])

    return (
        <section className={cn('section')}>
            <div className={cn('container')}>
                <h1>Новости</h1>
                <div className={styles.newsBlock}>
                    {news.map(article => <NewsPreview
                        key={article._id}
                        imgSrc={mockImg}
                        title={article.title}
                        shortInfo={article.previewText}
                        tags={article.tags}
                        date={article.date}
                    ></NewsPreview>)}
                </div>
                <div className={styles.buttonWrapper}>
                    <DefaultButton
                        text="Все новости"
                        style={ButtonStyles.filled}
                        type={ButtonTypes.button}
                    ></DefaultButton>
                </div>
            </div>
        </section >
    )
}

export default NewsBlock;