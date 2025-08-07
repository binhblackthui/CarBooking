import React, { useEffect } from "react";
import Title from "../components/Title";
import CarCard from "../components/CarCard";
import Pagination from "../components/Pagination";
import { CarContext } from "../contexts/CarContext";
import { useContext } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Loader from "../components/Loader";
import { motion } from "motion/react";
import { AnimatePresence } from "motion/react";

const Cars = () => {
  const sizePage = import.meta.env.VITE_SIZE_PAGE || 10; // Default to 10 if not set
  const [searchParams] = useSearchParams();
  const page = searchParams.get("page") || 1;
  const location = searchParams.get("location") || "";
  const pickup_date = searchParams.get("pickup_date") || "";
  const return_date = searchParams.get("return_date") || "";
  const { cars, searchCars } = useContext(CarContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCars = async () => {
      try {
        await searchCars({
          page: page - 1,
          size: sizePage,
          location: location,
          pickup_date: pickup_date || "",
          return_date: return_date || "",
        });
        window.scrollTo(0, 0);
      } catch (error) {
        console.error("Error fetching cars:", error);
      }
    };
    fetchCars();
  }, [page]);

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="flex flex-col items-center py-20 bg-light max-md:px-4"
      >
        <Title
          title="Available Cars"
          subTitle="Browse our selection of premium vehicles available for yur next adventure"
        />
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 1 }}
        className="px-6 md:px-16 lg:px-24 xl:px-32 mt-10"
      >
        {cars?.data?.length > 0 && (
          <>
            {" "}
            <p className="text-gray-500 xl:px-20 max max-w-7xl mx-auto">
              Showing {cars?.totalElements} Cars
            </p>
            <AnimatePresence>
              <div className="grid gird-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-4 xl:px-20 max-w-7xl mx-auto">
                {cars.data.map((car, index) => (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    key={index + sizePage * (cars.currentPage || 0)}
                    onClick={() => navigate(`/car-details/${car.id}`)}
                  >
                    <CarCard car={car} />
                  </motion.div>
                ))}
              </div>
            </AnimatePresence>
            {cars.totalPages > 1 && (
              <Pagination
                currentPage={cars?.currentPage + 1}
                totalPages={cars?.totalPages}
              />
            )}
          </>
        )}
      </motion.div>
    </div>
  );
};

export default Cars;
