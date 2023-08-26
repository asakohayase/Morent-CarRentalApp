import AddCarForm from '@/components/AddCar/AddCarForm';

const page = () => {
  return (
    <div className='padding-layout relative my-[30px] flex flex-col rounded-[10px] bg-white-0 px-6 py-10 dark:bg-gray-850 md:my-[50px] md:py-[30px]'>
      <div className='inline-flex flex-col items-start justify-start gap-2.5'>
        <div className='text-xl font-bold text-gray-900 dark:text-white-0'>
          Add a Car for Rent
        </div>
        <div className='text-sm font-medium text-gray-400'>
          Please enter your car info
        </div>
      </div>
      <div className='inline-flex flex-col items-start justify-start gap-6 pt-[34px]'>
        <div className='text-lg font-extrabold text-blue-500'>CAR INFO</div>
        <AddCarForm />
      </div>
    </div>
  );
};

export default page;
