import React from 'react';

function Clients() {
  const clients = [
    {
      name: "Hooli",
      logo: "/images/hooli.png"
    },
    {
      name: "Lyft",
      logo: "/images/lyft.png"
    },
    {
      name: "Hat",
      logo: "/images/hat.png"
    },
    {
      name: "Stripe",
      logo: "/images/stripe.png"
    },
    {
      name: "AWS",
      logo: "/images/aws.png"
    },
    {
      name: "Reddit",
      logo: "/images/reddit.png"
    }
  ];

  return (
    <div className="flex flex-col items-center py-12 bg-lightGray">
      <div className="flex flex-col gap-8 px-4">
        {clients.map((client, index) => (
          <div key={index} className="flex items-center justify-center">
            <img
              src={client.logo}
              alt={client.name}
              className="h-au w-[150px] grayscale hover:grayscale-0 transition-all duration-300"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Clients;