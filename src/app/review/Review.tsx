import { Card } from '@mui/material';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';

const reviews = [
  {
    userImage: '/images/reviewuser1.svg',
    name: 'Goldy',
    date: '02/03/2024',
    rating: 5,
    comment: 'Very Good Product',
  },
  {
    userImage: '/images/reviewuser2.svg',
    name: 'Goldy',
    date: '02/03/2024',
    rating: 2,
    comment: 'Very Good Product',
  },
  {
    userImage: '/images/reviewuser3.svg',
    name: 'Goldy',
    date: '02/03/2024',
    rating: 1,
    comment: 'Very Good Product',
  },
  {
    userImage: '/images/reviewuser4.svg',
    name: 'Goldy',
    date: '02/03/2024',
    rating: 4,
    comment: 'Very Good Product',
  },
  {
    userImage: '/images/reviewuser1.svg',
    name: 'Goldy',
    date: '02/03/2024',
    rating: 5,
    comment: 'Very Good Product',
  },
  {
    userImage: '/images/reviewuser2.svg',
    name: 'Goldy',
    date: '02/03/2024',
    rating: 2,
    comment: 'Very Good Product',
  },
  {
    userImage: '/images/reviewuser3.svg',
    name: 'Goldy',
    date: '02/03/2024',
    rating: 1,
    comment: 'Very Good Product',
  },
  {
    userImage: '/images/reviewuser4.svg',
    name: 'Goldy',
    date: '02/03/2024',
    rating: 4,
    comment: 'Very Good Product',
  },
];
const BarGraph = ({ totalRatings, maxRatings }: any) => {
  // Calculate bar width based on total ratings value as a percentage of the maximum ratings
  const barWidth = `${(totalRatings / maxRatings) * 100}%`;

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      {/* Bar Graph */}
      <div
        style={{
          height: '15px',
          width: '220px',
          backgroundColor: '#E4E4E4',
          position: 'relative',
          marginRight: '14px',
        }}
      >
        <div
          style={{
            height: '100%',
            width: barWidth, // Set bar width based on totalRatings
            backgroundColor: '#C5C5C5',
          }}
        />
      </div>
      {/* Value on the right */}
      <span style={{ color: '#607274', fontWeight: 'bold' }}>({totalRatings})</span>

      <style jsx>{`
        @media (max-width: 768px) {
          div {
            width: 170px; /* Adjust outer div's width */
          }
        }
        @media (max-width: 480px) {
          div {
            width: 210px; /* Further reduce outer div's width */
          }
        }
      `}</style>
    </div>
  );
};

const Review = () => {
  // Total reviews for the product
  const maxRatings = 2856; // This represents the total number of reviews

  return (
    <div className="flex flex-col gap-6 ">
      <div className="flex items-center justify-center gap-2 py-2">
        <img src="/images/bigstar.svg" alt="" className="sm:w-11 md:w-13px" />
        <p className="font-medium text-[50px] font-dmSans sm:text-[40px] md:text-[45px]">4.7</p>
      </div>
      <p className="font-normal text-[40px] font-dmSans text-center sm:text-[32px]">
        2,856 Reviews
      </p>
      <div className="flex items-center justify-center">
        <Stack spacing={1}>
          {[
            { value: 5, totalRatings: 2476 },
            { value: 4, totalRatings: 194 },
            { value: 3, totalRatings: 34 },
            { value: 2, totalRatings: 12 },
            { value: 1, totalRatings: 112 },
          ].map((ratingData, index) => (
            <div className="flex items-center gap-4  " key={index}>
              {/* Responsive Rating Component */}
              <Rating
                name={`half-rating-read-${ratingData.value}`}
                defaultValue={ratingData.value}
                sx={{
                  color: '#8A8A8A',
                  '& .MuiRating-icon': {
                    fontSize: {
                      xs: '1.5rem', // Small size for mobile
                      sm: '1.5rem', // Smaller tablets
                      md: '2rem', // Regular size for larger screens
                    },
                  },
                }}
                readOnly
              />
              {/* Responsive Bar Graph */}
              <BarGraph
                value={ratingData.value}
                totalRatings={ratingData.totalRatings}
                maxRatings={maxRatings}
              />
            </div>
          ))}
        </Stack>
      </div>

      <div className="flex justify-center gap-10 ">
        <input
          type="text"
          placeholder="Write a review"
          className="border border-black w-[431px] h-[50px] px-4 focus:outline-none focus:ring-0 text-center placeholder:text-black"
        />
        <div className="h-[50px] border border-black w-[50px] flex items-center justify-center">
          <img src="/images/filter.svg" alt="" />
        </div>
      </div>
      <div className="justify-center flex items-center mb-10   ">
        <div className="flex gap-4 justify-center flex-wrap w-[1000px] ">
          {reviews.map((review, index) => (
            <Card
              key={index}
              className="bg-white w-[220px] flex flex-col h-full shadow-md"
            >
              {/* <CardMedia component="img" height="140" image={review.userImage} alt={`${review.name} image`} /> */}
              <img src={review.userImage} alt={`${review.name} image`} />
              <div className="flex flex-col gap-2 p-2">
                <p className="font-bold text-[12px] font-dmSans ">{review.name}</p>
                <p className="font-normal text-[6px] font-dmSans ">{review.date}</p>
                <Stack>
                  <Rating
                    name={`half-rating-read-${index}`}
                    defaultValue={review.rating}
                    sx={{
                      color: '#8A8A8A',
                      '& .MuiRating-icon': {
                        fontSize: {
                          xs: '1rem',
                          sm: '1.5rem',
                          md: '1.5rem',
                        },
                      },
                    }}
                    readOnly
                  />
                </Stack>

                <p className="font-normal text-[6px] font-dmSans">{review.comment}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Review;
