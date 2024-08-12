
const frequencies = [
    { id: '1', value: '1', label: 'Monthly', priceSuffix: '/month' },
    { id: '2', value: '2', label: 'Annually', priceSuffix: '/year' },
  ];
  
  const tiers = [
    {
      name: 'Free',
      id: '0',
      href: '/dashboard',
      price: { '1': 'Free', '2': 'Free' },
      discountPrice: { '1': '', '2': '' },
      description: `Individual users, small projects, and those who want to explore our services.`,
      features: [
        `Synthetic Data Generation: Limited to 100 data points per day.`,
        `Data Labelling: Label up to 50 data items per day.`,
        `Crowdsourcing Data: Limited to 10 tasks per day.`,
        `Data Cleaning: Process up to 200 rows per day.`,
        `Model Evaluation: Evaluate 1 model per day.`,
        `AI Assistance: Perform basic EDA on 1 CSV file per day with AI.`
      ],
      credits : "5 credits per day",
      featured: false,
      highlighted: true,
      soldOut: false,
      cta: `Sign up`,
    },
    {
      name: 'Pro',
      id: '1',
      href: '/subscribe',
      price: { '1': '₹799', '2': '₹9,600' },
      discountPrice: { '1': '', '2': '7200' },
      description: `Professionals and medium-sized projects requiring more extensive usage.`,
      features: [
        `Synthetic Data Generation: Up to 10,000 data points per day.`,
        `Data Labelling: Label up to 1,000 data items per day.`,
        `Crowdsourcing Data: Unlimited tasks per day.`,
        `Data Cleaning: Process up to 10,000 rows per day.`,
        `Model Evaluation: Evaluate up to 10 models per day.`,
        `AI Assistance: Perform EDA on up to 10 CSV files per day with AI.`,
      ],
      credits : "Unlimited",
      featured: false,
      highlighted: true,
      soldOut: false,
      cta: `Get started`,
    },
    {
      name: 'Scaler',
      id: '2',
      href: '/contact-us',
      price: { '1': '₹1,800', '2': '₹21,900' },
      discountPrice: { '1': '', '2': '16,500' },
      description: `When you grow, need more power and flexibility.`,
      features: [
        `Synthetic Data Generation: Customized based on requirements.`,
        `Data Labelling: Tailored to project needs.`,
        `Crowdsourcing Data: Fully scalable according to demand.`,
        `Data Cleaning: Customized row processing limits.`,
        `Model Evaluation: Custom evaluation capabilities.`,
        `AI Assistance: Full AI EDA support with advanced features.`,
      ],
      credits : "Customized",
      featured: true,
      highlighted: false,
      soldOut: false,
      cta: `Contact us`,
    },
  ];

  const CheckIcon = ({ className }) => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className={`w-6 h-6 ${className}`}
      >
        <path
          fillRule="evenodd"
          d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
          clipRule="evenodd"
        />
      </svg>
    );
  };

  export {
    frequencies,
    tiers,
    CheckIcon
  }