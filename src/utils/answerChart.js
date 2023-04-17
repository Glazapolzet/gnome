import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

export const data = {
  labels: ['Неверно', 'Верно'],
  datasets: [
    {
      label: ' дано ответов',
      data: [12, 19],
      backgroundColor: [
        'rgb(255,99,132)',
        'rgb(54,235,57)',
      ],
      // borderColor: [
      //   'rgb(255, 99, 132)',
      //   'rgb(87,235,54)',
      // ],
      // borderWidth: 1,
    },
  ],
};
