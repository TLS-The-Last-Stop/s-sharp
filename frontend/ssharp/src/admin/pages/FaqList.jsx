import React, {useEffect, useState} from 'react';
import {faqService} from "../api/faqService";
import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer} from 'recharts';
import styled from 'styled-components';

const ChartContainer = styled.div`
    width: 80%;
    max-width: 1000px;
    height: 500px;
    margin: 2rem auto;
    padding: 1rem;
    background-color: #f8f9fa;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
    text-align: center;
    color: #333;
    margin-bottom: 1rem;
`;

const CustomTooltip = ({active, payload, label}) => {
  if (active && payload && payload.length) {
    return (
        <div style={{backgroundColor: '#fff', padding: '5px', border: '1px solid #ccc'}}>
          <p><strong>순위: {label}</strong></p>
          <p>{payload[0].payload.fullQuestion}</p>
          <p>조회수: {payload[0].value}</p>
        </div>
    );
  }
  return null;
};

const FaqList = () => {
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        const response = await faqService.getAllFaq();
        const faqs = response.data;
        const topFaqs = faqs
            .sort((a, b) => b.views - a.views)
            .slice(0, 10)
            .map((faq, index) => ({
              rank        : index + 1,
              question    : `${index + 1}위`,
              fullQuestion: faq.question,
              views       : faq.views
            }));

        setChartData(topFaqs);
        setLoading(false);
      } catch (error) {
        console.error("FAQ 불러오기 오류:", error);
        setError("FAQ를 불러오는 데 실패했습니다.");
        setLoading(false);
      }
    };

    fetchFaqs();
  }, []);

  if (loading) return <ChartContainer>로딩 중...</ChartContainer>;
  if (error) return <ChartContainer>{error}</ChartContainer>;

  return (
      <ChartContainer>
        <Title>상위 10개 FAQ 조회수</Title>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
              data={chartData}
              margin={{
                top   : 20,
                right : 30,
                left  : 20,
                bottom: 5,
              }}
          >
            <CartesianGrid strokeDasharray="3 3"/>
            <XAxis dataKey="question"/>
            <YAxis/>
            <Tooltip content={<CustomTooltip/>}/>
            <Legend/>
            <Bar dataKey="views" fill="#8884d8"/>
          </BarChart>
        </ResponsiveContainer>
      </ChartContainer>
  );
};

export default FaqList;