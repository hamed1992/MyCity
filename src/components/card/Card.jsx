import Link from "next/link";
import { useConvertDigitToFa, useNumberSeprator } from "../../hooks";
function Card() {
  return (
    <Link href="/products/[id]" as="/products/1">
      <a>
        <img
          className="w-full xs:h-40 md:h-48 object-cover object-center rounded-md rounded-b-none "
          src="/assets/images/3.jpg"
          alt="#"
        />
        <div className="p-4 bg-white rounded-md rounded-t-none">
          <span className="text-gray-800">دسته بندی محصول</span>
        </div>
      </a>
    </Link>
  );
}

export default Card;
