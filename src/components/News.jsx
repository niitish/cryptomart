import { Select, Typography, Row, Col, Avatar, Card } from "antd";
import dummyNewsImg from "../images/dummynewsimage.jpg";
import moment from "moment";
import { useGetNewsQuery } from "../services/cryptoNewsAPI";
import { useGetCryptosQuery } from "../services/cryptoAPI";
import { useState } from "react";

const { Text, Title } = Typography;
const { Option } = Select;

const News = ({ simplified }) => {
	const count = simplified ? 9 : 36;
	const [newsCategory, setNewsCategory] = useState("Cryptocurrency");
	const { data } = useGetCryptosQuery(100);
	const { data: cryptoNews } = useGetNewsQuery(newsCategory, count);
	if (!cryptoNews?.value) return "Loading...";

	return (
		<>
			<Row gutter={[32, 32]}>
				{!simplified && (
					<div className="search-crypto">
						<Col span={24}>
							<Select
								showSearch
								className="select-news"
								placeholder="Select Crypto"
								optionFilterProp="children"
								onChange={(e) => setNewsCategory(e + " crypto")}
								filterOption={(input, option) =>
									option.children.toLowerCase().indexOf(input.toLowerCase())
								}
							>
								<Option value="Cryptocurrency">Cryptocurrency</Option>
								{data?.data?.coins.map((coin) => (
									<Option value={coin.name}>{coin.name}</Option>
								))}
							</Select>
						</Col>
					</div>
				)}
			</Row>
			<Row gutter={[16, 16]}>
				{cryptoNews.value.map((news, i) => (
					<Col xs={24} sm={12} lg={8} key={i}>
						<Card className="news-card" hoverable>
							<a href={news.url} target="_blank" rel="noreferrer">
								<div className="news-image-container">
									<Title className="new-title" level={4}>
										{news.name}
									</Title>
									<img
										src={news?.image?.thumbnail?.contentUrl || dummyNewsImg}
										alt={news.name}
										style={{ maxWidth: "150px", maxHeight: "100px" }}
									/>
								</div>
								<p>
									{news.description > 100
										? `${news.description.substring(0, 100)}...`
										: news.description}
								</p>
								<div className="provider-container">
									<div>
										<Avatar
											src={
												news.provider[0]?.image?.thumbnail?.contentUrl ||
												dummyNewsImg
											}
											alt="news source"
										/>
										<Text className="provider-name">
											{news.provider[0]?.name}
										</Text>
									</div>
									<Text>
										{moment(news.datePublished).startOf("ss").fromNow()}
									</Text>
								</div>
							</a>
						</Card>
					</Col>
				))}
			</Row>
		</>
	);
};

export default News;
