import React, { useEffect, useState } from "react";

const App = () => {
  // dummy json api we are using

  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const fetchProducts = async () => {
    const response = await fetch(`https://dummyjson.com/products?limit=10&skip=${(page - 1) * 10}`);

    // (page -1) * limit  its the formula for pagination
    
    const data = await response.json();
    setProducts(data.products);
    setTotalPages(Math.ceil(data.total / 10));
  };

  useEffect(() => {
    fetchProducts();
  }, [page]);

  const selectPageHandler = (selectedPage) => {
    if (selectedPage >= 1 && selectedPage <= totalPages && selectedPage !== page) {
      setPage(selectedPage);
    }
  };

  return (
    <>
      <div className="mb-10">
        <div className="text-center mt-10 font-semibold text-4xl">Products</div>
        <div className="grid mt-10 mx-10 md:grid-cols-3 grid-cols-1 gap-6">
          {products?.length > 0 &&
            products.map((product) => (
              <div
                key={product?.id}
                className="w-full h-full bg-zinc-400 cursor-pointer p-10 gap-5 rounded-lg flex flex-col justify-center items-center"
              >
                <img
                  src={product?.thumbnail}
                  alt={product?.title}
                  className="rounded-lg hover:scale-[108%] transition-all duration-300"
                />
                <span className="font-semibold text-xl">{product?.title}</span>
              </div>
            ))}
        </div>

        {products.length > 0 && (
          <div className="flex justify-center mt-16 gap-10 text-xl font-semibold items-center">
            <span
              onClick={() => setPage(page + 1)}
              className={`cursor-pointer border-[2px] px-4 py-3 rounded-lg ${page >= totalPages ? "opacity-0" : ""}`}
            >
              Next
            </span>

            <span>
              {[...Array(totalPages)].map((_, i) => (
                <span
                  className={`cursor-pointer border-[2px] px-4 py-3 rounded-lg ${page === i + 1 && "bg-black text-white"}`}
                  key={i}
                  onClick={() => selectPageHandler(i + 1)}
                >
                  {i + 1}
                </span>
              ))}
            </span>
            <span
              onClick={() => setPage(page - 1)}
              className={`cursor-pointer border-[2px] px-4 py-3 rounded-lg ${page <= 1 ? "opacity-0" : ""}`}
            >
              Prev
            </span>
          </div>
        )}
      </div>
    </>
  );
};

export default App;
