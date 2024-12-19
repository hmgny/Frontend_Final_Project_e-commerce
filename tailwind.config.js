/** @type {import('tailwindcss').Config} */
import plugin from 'tailwindcss/plugin';
export default {
    darkMode: ["class"],
    content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
  	extend: {
  		colors: {
  			Primary: '#23A6F0',
  			Secondary: '#23856D',
  			Secondary2: '#3C403D',
  			lightBackground: '#FFFFFF',
  			darkBackground: '#252B42',
  			succes: '#20C071',
  			alert: '#E77C40',
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			danger: '#E74040',
  			disabledElement: '#8EC2F2',
  			lightGray: '#FAFAFA',
  			textColor: '#252B42',
  			SecondaryTextColor: '#737373',
  			lightTextColor: '#FFFFFF',
  			lightGray2: '#E6E6E6',
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		width: {
  			'Card': '380px',
  			'BlogCardWeb': '440px'
  		},
  		height: {
  			Category: '500px',
  			CategorySmall: '250px',
  			ProductCard: '425px',
  			BlogCard: '350px',
  			BlogCardWeb: '420px'
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	},
  	headers: {
  		h1: '58px',
  		h2: '40px',
  		h3: '30px',
  		h4: '24px',
  		h5: '20px',
  		h6: '16px',
  		h7: '14px',
  		h8: '12px'
  	}
  },
  plugins: [
    plugin(function({ addUtilities, theme }) {
      const headers = theme('headers');
      const headerUtilities = Object.entries(headers).reduce((acc, [key, value]) => {
        acc[`.${key}`] = { fontSize: value };
        return acc;
      }, {});
  
      addUtilities(headerUtilities);
    }),
      require("tailwindcss-animate")
],
}

