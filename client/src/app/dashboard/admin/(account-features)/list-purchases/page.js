/**
 * Title: Write a program using JavaScript on Page
 * Author: Hasibul Islam
 * Portfolio: https://devhasibulislam.vercel.app
 * Linkedin: https://linkedin.com/in/devhasibulislam
 * GitHub: https://github.com/devhasibulislam
 * Facebook: https://facebook.com/devhasibulislam
 * Instagram: https://instagram.com/devhasibulislam
 * Twitter: https://twitter.com/devhasibulislam
 * Pinterest: https://pinterest.com/devhasibulislam
 * WhatsApp: https://wa.me/8801906315901
 * Telegram: devhasibulislam
 * Date: 20, January 2024
 */

"use client";

import Inform from "@/components/icons/Inform";
import View from "@/components/icons/View";
import Modal from "@/components/shared/Modal";
import Dashboard from "@/components/shared/layouts/Dashboard";
import { setPurchases } from "@/features/purchase/purchaseSlice";
import {
  useGetAllPurchasesQuery,
  useUpdatePurchaseStatusMutation,
} from "@/services/purchase/purchaseApi";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useMemo, useState } from "react";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";

const Page = () => {
  const { isLoading, data, error } = useGetAllPurchasesQuery();
  const purchases = useMemo(() => data?.data || [], [data]);
  const [filter, setFilter] = useState("all");
  const dispatch = useDispatch();

  const filteredPurchases = useMemo(() => {
    if (filter === "all") {
      return purchases;
    } else if (filter === "pending") {
      return purchases.filter((purchase) => purchase?.status === "pending");
    } else if (filter === "delivered") {
      return purchases.filter((purchase) => purchase?.status === "delivered");
    }
  }, [purchases, filter]);

  useEffect(() => {
    if (isLoading) {
      toast.loading("Fetching Purchases...", { id: "purchases" });
    }

    if (data) {
      toast.success(data?.description, { id: "purchases" });
    }

    if (error?.data) {
      toast.error(error?.data?.description, { id: "purchases" });
    }

    dispatch(setPurchases(purchases));
  }, [isLoading, data, error, dispatch, purchases]);

  return (
    <Dashboard>
      {filteredPurchases?.length === 0 ? (
        <p className="text-sm flex flex-row gap-x-1 items-center justify-center">
          <Inform /> No Purchases Found!
        </p>
      ) : (
        <section className="w-full h-full flex flex-col gap-y-6">
          <div className="flex flex-row gap-x-2">
            <button
              type="button"
              className={`text-sm bg-purple-50 border border-purple-900 rounded-secondary text-purple-900 px-4 py-1 ${
                filter === "all" && "bg-purple-900 !text-white"
              }`}
              onClick={() => setFilter("all")}
            >
              All
            </button>
            <button
              type="button"
              className={`text-sm bg-red-50 border border-red-900 rounded-secondary text-red-900 px-4 py-1 ${
                filter === "pending" && "bg-red-900 !text-white"
              }`}
              onClick={() => setFilter("pending")}
            >
              Pending
            </button>
            <button
              type="button"
              className={`text-sm bg-green-50 border border-green-900 rounded-secondary text-green-900 px-4 py-1 ${
                filter === "delivered" && "bg-green-900 !text-white"
              }`}
              onClick={() => setFilter("delivered")}
            >
              Delivered
            </button>
          </div>
          <div className="overflow-x-auto w-full">
            <table className="w-full divide-y divide-gray-200">
              <thead className="bg-slate-100">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase whitespace-nowrap"
                  >
                    Customer ID
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase whitespace-nowrap"
                  >
                    Order ID
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase whitespace-nowrap"
                  >
                    Avatar
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase whitespace-nowrap"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase whitespace-nowrap"
                  >
                    Total Amount
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase whitespace-nowrap"
                  >
                    Status
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase whitespace-nowrap"
                  >
                    Action
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase whitespace-nowrap"
                  >
                    <span className="sr-only">Action</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredPurchases.map((purchase) => (
                  <tr
                    key={purchase?._id}
                    className="odd:bg-white even:bg-gray-100 hover:odd:bg-gray-100"
                  >
                    <td className="px-6 py-4">
                      <span className="whitespace-nowrap w-60 overflow-x-auto block scrollbar-hide text-sm">
                        {purchase?.customerId}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="whitespace-nowrap w-60 overflow-x-auto block scrollbar-hide text-sm">
                        {purchase?.orderId}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <Image
                        src={purchase?.customer?.avatar?.url}
                        alt={purchase?.customer?.avatar?.public_id}
                        height={30}
                        width={30}
                        className="h-[30px] w-[30px] rounded-secondary border border-green-500/50 object-cover"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <span className="whitespace-nowrap text-sm">
                        {purchase?.customer?.name}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="whitespace-nowrap scrollbar-hide text-sm">
                        {purchase?.totalAmount / 100}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {purchase?.status === "pending" && (
                        <span className="bg-red-50 border border-red-900 px-2 rounded-secondary text-red-900 text-xs uppercase">
                          {purchase?.status}
                        </span>
                      )}
                      {purchase?.status === "delivered" && (
                        <span className="bg-green-50 border border-green-900 px-2 rounded-secondary text-green-900 text-xs uppercase">
                          {purchase?.status}
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <ModifyStatus
                        id={purchase?._id}
                        status={purchase?.status}
                      />
                    </td>
                    <td className="px-6 py-4">
                      <ViewProducts products={purchase?.products} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}
    </Dashboard>
  );
};

function ModifyStatus({ id, status }) {
  const [updatePurchaseStatus, { isLoading, data, error }] =
    useUpdatePurchaseStatusMutation();

  useEffect(() => {
    if (isLoading) {
      toast.loading("Updating Status...", { id: "updateStatus" });
    }
    if (data) {
      toast.success(data?.description, { id: "updateStatus" });
    }
    if (error) {
      toast.error(error?.data?.description, { id: "updateStatus" });
    }
  }, [isLoading, data, error]);

  return (
    <select
      name="status"
      id="status"
      className="text-xs uppercase"
      defaultValue={status}
      onChange={(e) =>
        updatePurchaseStatus({ id: id, body: { status: e.target.value } })
      }
    >
      <option value="pending">Pending</option>
      <option value="delivered">Delivered</option>
    </select>
  );
}

function ViewProducts({ products }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        className="text-sm bg-cyan-50 border border-cyan-900 rounded-secondary text-cyan-900 p-1"
        onClick={() => setIsOpen(!isOpen)}
      >
        <View />
      </button>

      {isOpen && (
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          className="p-6 lg:w-1/3 md:w-3/4 w-full max-h-96 overflow-y-auto scrollbar-hide"
        >
          <div className="flex flex-col gap-y-4">
            {products?.map(({ product, quantity, _id }) => (
              <div key={_id} className="flex flex-row gap-x-2 items-start">
                <Image
                  src={product?.thumbnail?.url}
                  alt={product?.thumbnail?.public_id}
                  height={40}
                  width={40}
                  className="w-[40px] h-[40px] object-cover rounded"
                />
                <div className="flex flex-col">
                  <p className="text-base line-clamp-1 font-semibold">
                    {product?.title}
                  </p>
                  <p className="text-sm line-clamp-2">{product?.summary}</p>
                  <p className="text-xs mt-2">
                    QTY: {quantity} • Price: ${product?.price} • Total Price: $
                    {product?.price * quantity}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Modal>
      )}
    </>
  );
}

export default Page;
