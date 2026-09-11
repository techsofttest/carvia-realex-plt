"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/Button";

export default function SourcingFromIndiaPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    country: "",
    quantity: "",
    requirements: "",
    product: "",
    message: "",
    captchaInput: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [captchaCode, setCaptchaCode] = useState("");

  const generateCaptcha = () => {
    const chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let code = "";
    for (let i = 0; i < 6; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCaptchaCode(code);
  };

  useEffect(() => {
    generateCaptcha();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");

    try {
      const response = await fetch(`${baseUrl}/form`,{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          expectedCaptcha: captchaCode,
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSubmitted(true);
      } else {
        setErrorMessage(data.message || "Failed to submit inquiry. Please check your inputs.");
        generateCaptcha();
      }
    } catch (error) {
      setErrorMessage("An unexpected error occurred. Please try again later.");
      generateCaptcha();
    } finally {
      setLoading(false);
    }
  };
  return (
   
      <section
        id="requirement-form"
        className="relative w-full py-20 lg:py-28 bg-[#011842] text-white overflow-hidden"
      >
        {/* Full Width Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/hero/h3.png"
            alt="Contact Background"
            fill
            sizes="100vw"
            className="object-cover object-right"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#011842]/95 via-[#011842]/80 to-transparent z-10" />
        </div>

        {/* Left-aligned Content Container */}
        <div className="w-full px-6 lg:px-16 relative z-20">
          <div className="max-w-3xl lg:w-7/12">
            {submitted ? (
              <div className="py-12 space-y-6 text-left">
                <div className="w-16 h-16 bg-green-500/20 border border-green-500 text-green-400 rounded-full flex items-center justify-center">
                  <svg
                    className="w-8 h-8"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <h3 className="text-3xl font-bold text-white">
                  REQUIREMENT Submitted Successfully!
                </h3>
                <p className="text-sm text-gray-200 max-w-md leading-relaxed">
                  Thank you for contacting our trade desk. We have received
                  your request and will reach out to you within 24 hours.
                </p>
                <Button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({
                      name: "",
                      email: "",
                      phone: "",
                      company: "",
                      country: "",
                      product: "",
                      quantity: "",
                      requirements: "",
                      message: "",
                      captchaInput: "",
                    });
                    generateCaptcha();
                  }}
                  variant="primary"
                  className="px-6 py-3"
                >
                  Send Another REQUIREMENT
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <span className="text-xs font-bold uppercase tracking-widest text-[#80BDFF] mb-2 block">
                    Fast-Track Trade Desk
                  </span>
                  <h3 className="text-3xl font-bold text-white mb-2">
                   SEND YOUR REQUIREMENT
                  </h3>
                  <p className="text-sm text-gray-200">
                    Fill out the details below to receive product specifications
                    and pricing.
                  </p>
                </div>

                {errorMessage && (
                  <div className="p-4 bg-red-500/20 border border-red-500 text-red-200 text-sm rounded">
                    {errorMessage}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-12">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-white mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      placeholder="e.g. John Smith"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full h-11 px-4 text-sm bg-black/40 border border-white/30 text-white placeholder-gray-300 focus:border-white focus:bg-black/60 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-white mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder="name@company.com"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full h-11 px-4 text-sm bg-black/40 border border-white/30 text-white placeholder-gray-300 focus:border-white focus:bg-black/60 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-white mb-2">
                      Phone / WhatsApp *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      placeholder="+1 (555) 000-0000"
                      value={formData.phone}
                      onChange={(e) => {
                        const value = e.target.value.replace(
                          /[^0-9+\s()\-]/g,
                          ""
                        );
                        setFormData((prev) => ({ ...prev, phone: value }));
                      }}
                      className="w-full h-11 px-4 text-sm bg-black/40 border border-white/30 text-white placeholder-gray-300 focus:border-white focus:bg-black/60 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-white mb-2">
                      Company Name
                    </label>
                    <input
                      type="text"
                      name="company"
                      placeholder="Your Business / Organization"
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full h-11 px-4 text-sm bg-black/40 border border-white/30 text-white placeholder-gray-300 focus:border-white focus:bg-black/60 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-white mb-2">
                      Destination Country *
                    </label>
                    <input
                      type="text"
                      name="country"
                      required
                      placeholder="e.g. United Arab Emirates, Germany"
                      value={formData.country}
                      onChange={handleChange}
                      className="w-full h-11 px-4 text-sm bg-black/40 border border-white/30 text-white placeholder-gray-300 focus:border-white focus:bg-black/60 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-white mb-2">
                      Product Name
                    </label>
                    <input
                      type="text"
                      name="product"
                      placeholder="e.g. Premium Basmati Rice"
                      value={formData.product}
                      onChange={handleChange}
                      className="w-full h-11 px-4 text-sm bg-black/40 border border-white/30 text-white placeholder-gray-300 focus:border-white focus:bg-black/60 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-white mb-2">
                      Product Quantity *
                    </label>
                    <input
                      type="text"
                      name="quantity"
                      required
                      placeholder="e.g. 1000 kg, 500 pcs"
                      value={formData.quantity}
                      onChange={handleChange}
                      className="w-full h-11 px-4 text-sm bg-black/40 border border-white/30 text-white placeholder-gray-300 focus:border-white focus:bg-black/60 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-white mb-2">
                      Product Requirements
                    </label>
                    <input
                      type="text"
                      name="requirements"
                      placeholder="e.g. Organic, Grade A"
                      value={formData.requirements}
                      onChange={handleChange}
                      className="w-full h-11 px-4 text-sm bg-black/40 border border-white/30 text-white placeholder-gray-300 focus:border-white focus:bg-black/60 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-white mb-2">
                    Message / Required Quantity & Terms
                  </label>
                  <textarea
                    name="message"
                    rows={4}
                    placeholder="Specify quantity (FCL/LCL), packing requirements, target delivery date..."
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full p-4 text-sm bg-black/40 border border-white/30 text-white placeholder-gray-300 focus:border-white focus:bg-black/60 focus:outline-none resize-y"
                  />
                </div>

                {/* Captcha Section */}
                <div className="space-y-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-white">
                    Security Verification *
                  </label>
                  <div className="flex items-center gap-4">
                    <div
                      suppressHydrationWarning
                      className="bg-white/10 border border-white/30 px-6 py-3 tracking-widest font-mono text-lg font-bold text-yellow-300 select-none"
                    >
                      {captchaCode}
                    </div>
                    <button
                      type="button"
                      onClick={generateCaptcha}
                      className="text-xs text-gray-300 underline hover:text-white"
                    >
                      Refresh Code
                    </button>
                  </div>
                  <input
                    type="text"
                    name="captchaInput"
                    required
                    placeholder="Enter the code shown above"
                    value={formData.captchaInput}
                    onChange={handleChange}
                    className="w-full h-11 px-4 text-sm bg-black/40 border border-white/30 text-white placeholder-gray-300 focus:border-white focus:bg-black/60 focus:outline-none"
                  />
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  className="w-full h-12 text-sm uppercase tracking-wider font-bold"
                >
                  {loading ? "Submitting..." : "Submit Export Inquiry"}
                </Button>
              </form>
            )}
          </div>
        </div>
      </section>

  );
}