import { useRef, useEffect, useState } from 'react';
import { Line, Chart } from 'react-chartjs-2';
import { FaDownload, FaRegBookmark } from 'react-icons/fa';
import { BsReply } from 'react-icons/bs';

import PropTypes from 'prop-types';

import styles from './index.module.scss';

const Graph = ({ data, options }) => {
  const chartRef = useRef(null);
  const [base64, setBase64] = useState();

  useEffect(() => {
    Chart.plugins.register({
      beforeDraw: function (chartInstance) {
        var ctx = chartInstance.chart.ctx;
        ctx.fillStyle = 'white';
        ctx.fillRect(
          0,
          0,
          chartInstance.chart.width,
          chartInstance.chart.height,
        );
      },
    });
  }, [chartRef]);

  const handleURL = () => {
    if (chartRef && chartRef.current) {
      const base64Image = chartRef.current.chartInstance.toBase64Image();
      setBase64(base64Image);
    }
  };

  return (
    <div className={styles.container}>
      <ul className={styles.actions}>
        <li>
          <BsReply />
        </li>
        <li>
          <a href={base64} download onClick={handleURL}>
            <FaDownload />
          </a>
        </li>
        <li>
          <FaRegBookmark />
        </li>
      </ul>
      <Line data={data} options={options} ref={chartRef} />
    </div>
  );
};

Graph.prototypes = {
  data: PropTypes.shape({}).isRequired,
  options: PropTypes.shape({}).isRequired,
};

export default Graph;
