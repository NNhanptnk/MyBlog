
// Footer
const Footer = () => {
    return (
      <>
      <div className="mt-8 w-full bg-black px-8 md:px-[300px] flex justify-between text-sm md:text-md py-8">
        <div className="flex flex-col text-white">
            <p> Featured Blog</p>
            <p> Most viewed</p>
            <p> Readers Choice</p>
        </div>
        {/* Fixing text-white is not working*/}
        <div className="flex flex-col text-white">
            <p> Forum</p>
            <p> Support</p>
            <p> Recent Posts</p>
        </div>
        <div className="flex flex-col text-white">
            <p> Privacy Policy</p>
            <p> About us</p>
            <p> Terms and Conditions</p>
            <p> Term of Service</p>
        </div>
      </div>
      <p className="py-2 pb-6 bg-black text-center text-white">All rights reserved @My Blog 2023</p>
      </>
      
    )
}
  
export default Footer