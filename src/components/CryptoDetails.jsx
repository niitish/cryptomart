import { useParams } from "react-router-dom";
import millify from "millify";
import { useState } from "react";
import { Col, Typography, Select } from "antd";
import {
	useGetCryptoDetailsQuery,
	useGetCryptoHistoryQuery,
} from "../services/cryptoAPI";
import {
	// MoneyCollectOutlined,
	DollarCircleOutlined,
	FundOutlined,
	ExclamationCircleOutlined,
	TrophyOutlined,
	NumberOutlined,
} from "@ant-design/icons";
import LineChart from "./LineChart";

const { Title, Text } = Typography;
const { Option } = Select;

const CryptoDetails = () => {
	const { coinID } = useParams();
	const [period, setPeriod] = useState("7d");
	const { data, isFetching } = useGetCryptoDetailsQuery(coinID);
	const { data: coinHistory, isFetching: fetchingHistory } =
		useGetCryptoHistoryQuery({
			coinID,
			period,
		});

	if (isFetching || fetchingHistory) return "Loading...";

	const cryptoDetails = data?.data?.coin;

	const time = ["3h", "24h", "7d", "30d", "3m", "1y", "3y", "5y"];
	const stats = [
		{
			title: "Price to USD",
			value: `$ ${cryptoDetails?.price && millify(cryptoDetails?.price)}`,
			icon: <DollarCircleOutlined />,
		},
		{ title: "Rank", value: cryptoDetails?.rank, icon: <NumberOutlined /> },
		{
			title: "Market Cap",
			value: `$ ${
				cryptoDetails?.marketCap && millify(cryptoDetails?.marketCap)
			}`,
			icon: <DollarCircleOutlined />,
		},
		{
			title: "All Time High",
			value: `$ ${
				cryptoDetails?.allTimeHigh?.price &&
				millify(cryptoDetails?.allTimeHigh?.price)
			}`,
			icon: <TrophyOutlined />,
		},
	];

	const genericStats = [
		{
			title: "Number Of Markets",
			value: cryptoDetails?.numberOfMarkets,
			icon: <FundOutlined />,
		},
		// {
		//   title: "Number Of Exchanges",
		//   value: cryptoDetails?.numberOfExchanges,
		//   icon: <MoneyCollectOutlined />,
		// },
		{
			title: "Total Supply",
			value: `$ ${
				cryptoDetails?.supply?.total && millify(cryptoDetails?.supply?.total)
			}`,
			icon: <ExclamationCircleOutlined />,
		},
		{
			title: "Circulation",
			value: `$ ${
				cryptoDetails?.supply?.circulating &&
				millify(cryptoDetails?.supply?.circulating)
			}`,
			icon: <ExclamationCircleOutlined />,
		},
	];

	return (
		<Col className="coin-detail-container">
			<Col className="coin-heading-container">
				<Title level={2} className="coin-name">
					{cryptoDetails.name} ({cryptoDetails.symbol})
				</Title>
				<p>
					{cryptoDetails.name} live price in USD, statistics, supply & market
					cap.
				</p>
			</Col>
			<Select
				defaultValue="7d"
				className="select-timeperiod"
				placeholder="Select time period"
				onChange={(e) => setPeriod(e)}
			>
				{time.map((t, k) => (
					<Option value={t} key={k}>
						{t}
					</Option>
				))}
			</Select>

			<LineChart
				coinHistory={coinHistory}
				currentPrice={cryptoDetails.price}
				coinName={cryptoDetails.name}
			/>

			<Col className="stats-container">
				<Col className="coin-value-statistics" xs={24} sm={24} lg={12}>
					<Col className="coin-value-statistics-heading">
						<Title level={3} className="coin-details-heading">
							{cryptoDetails.name} statistics
						</Title>
						<p>Overview of {cryptoDetails.name}</p>
					</Col>
					{stats.map(({ icon, title, value }, k) => (
						<Col className="coin-stats" key={k}>
							<Col className="coin-stats-name">
								<Text>{icon}</Text>
								<Text>{title}</Text>
							</Col>
							<Text className="stats">{value}</Text>
						</Col>
					))}
				</Col>

				<Col className="other-stats-info" xs={24} sm={24} lg={12}>
					<Col className="coin-value-statistics-heading">
						<Title level={3} className="coin-details-heading">
							Other statistics
						</Title>
						<p>Overview of all cryptocurrencies</p>
					</Col>
					{genericStats.map(({ icon, title, value }, k) => (
						<Col className="coin-stats" key={k}>
							<Col className="coin-stats-name">
								<Text>{icon}</Text>
								<Text>{title}</Text>
							</Col>
							<Text className="stats">{value}</Text>
						</Col>
					))}
				</Col>
			</Col>
		</Col>
	);
};

export default CryptoDetails;
