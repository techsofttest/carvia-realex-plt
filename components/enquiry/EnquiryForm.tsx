"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/Button";
import Select from "react-select";
import ReactCountryFlag from "react-country-flag";
import { countries } from "@/components/enquiry/countryData";
import { EnquirySuccessModal } from "./EnquirySuccessModal";

interface Product {
  id: string;
  slug: string;
  category: string;
  image: string;
  name: string;
  spec: string;
  origin: string;
  packing: string;
  content: string;
  imgs: string[];
}

interface EnquiryFormProps {
  product: Product;
}

export function EnquiryForm({ product }: EnquiryFormProps) {
  // Form State
  const [quantity, setQuantity] = useState<number>(10);
  const [unit, setUnit] = useState<string>("Metric Tons (MT)");
  const [shippingTerm, setShippingTerm] = useState<string>("FOB India Port");
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [countryCode, setCountryCode] = useState<string>("+971");
  const [phone, setPhone] = useState<string>("");
  const [company, setCompany] = useState<string>("");
  const [country, setCountry] = useState<string>("United Arab Emirates");
  const [address, setAddress] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [referenceNumber, setReferenceNumber] = useState("");

  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [captchaCode, setCaptchaCode] = useState("");
  const [captchaInput, setCaptchaInput] = useState("");

  const generateCaptcha = () => {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    let code = "";
    for (let i = 0; i < 4; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCaptchaCode(code);
    setCaptchaInput("");
  };

  // Generate initial captcha on mount
  useEffect(() => {
    generateCaptcha();
  }, []);

  const countryCodeOptions = countries.map((c) => ({
    value: c.dialCode,
    label: (
      <div className="flex items-center gap-2">
        <ReactCountryFlag countryCode={c.code} svg /> <span>{c.dialCode}</span>
      </div>
    ),
  }));

  const countryOptions = countries.map((c) => ({
    value: c.name,
    label: (
      <div className="flex items-center gap-2">
        <ReactCountryFlag countryCode={c.code} svg /> <span>{c.name} ({c.code})</span>
      </div>
    ),
  }));

  const customSelectStyles = {
    control: (provided: any, state: any) => ({
      ...provided,
      minHeight: '48px',
      height: '48px',
      borderRadius: '0',
      borderColor: state.isFocused ? '#1b64b3' : '#d1d5db',
      boxShadow: state.isFocused ? '0 0 0 1px #1b64b3' : 'none',
      '&:hover': {
        borderColor: '#1b64b3',
      },
      cursor: 'pointer',
    }),
    valueContainer: (provided: any) => ({
      ...provided,
      height: '48px',
      padding: '0 8px',
    }),
    input: (provided: any) => ({
      ...provided,
      margin: '0px',
    }),
    indicatorSeparator: () => ({
      display: 'none',
    }),
    indicatorsContainer: (provided: any) => ({
      ...provided,
      height: '48px',
    }),
    option: (provided: any, state: any) => ({
      ...provided,
      backgroundColor: state.isSelected ? '#1b64b3' : state.isFocused ? '#f3f4f6' : 'white',
      color: state.isSelected ? 'white' : '#111827',
      cursor: 'pointer',
    }),
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    // Basic Captcha Validation Check
    if (captchaInput.trim().toUpperCase() !== captchaCode) {
      setErrorMessage("Incorrect security verification code. Please try again.");
      generateCaptcha();
      return;
    }

    setIsSubmitting(true);

    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_URL || "";
      const res = await fetch(`${baseUrl}/send-form`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify({
          product_id: product.id,
          product_name: product.name,
          quantity,
          unit,
          shipping_term: shippingTerm,
          name,
          email,
          country_code: countryCode,
          phone,
          company,
          country,
          address,
          message,
          captcha: captchaInput,
          expectedCaptcha: captchaCode,
        }),
      });
  const data = await res.json();

    if (!res.ok || !data.success) {
        throw new Error(
            data?.message ||
            "Failed to submit enquiry. Please check your details."
        );
    }

    setReferenceNumber(data.reference_number);

    setIsSubmitted(true);

} catch (err: any) {
    setErrorMessage(
        err.message || "Something went wrong. Please try again."
    );
} finally {
    setIsSubmitting(false);
}
  };

  return (
    <>
      <div className="lg:col-span-8 bg-white border border-gray-200 p-6 lg:p-8">
        <div className="mb-5">
          <h2 className="text-lg lg:text-xl font-bold text-[#011842]">
            Request Quotation & Spec Sheet
          </h2>
        </div>

        {errorMessage && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 text-sm">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 pt-4">
          {/* Quantity Selector Section */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">
              Target Quantity & Shipping Unit <span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-5">
              <div className="sm:col-span-6">
                <div className="flex w-full h-12 border border-gray-300 focus-within:border-[#1b64b3] focus-within:ring-1 focus-within:ring-[#1b64b3] bg-white">
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-14 shrink-0 flex items-center justify-center border-r border-gray-300 bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-900 transition-colors focus:outline-none"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" /></svg>
                  </button>
                  <input
                    type="number"
                    min="1"
                    required
                    value={quantity || ""}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                    onBlur={(e) => setQuantity(Math.max(1, Number(e.target.value) || 1))}
                    className="flex-1 w-full text-center text-sm font-medium focus:outline-none text-gray-900 bg-transparent [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    placeholder="20"
                  />
                  <button
                    type="button"
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-14 shrink-0 flex items-center justify-center border-l border-gray-300 bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-900 transition-colors focus:outline-none"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                  </button>
                </div>
              </div>
              <div className="sm:col-span-6">
                <select
                  value={unit}
                  onChange={(e) => setUnit(e.target.value)}
                  className="w-full h-12 px-3 text-sm font-medium border border-gray-300 focus:border-[#1b64b3] focus:ring-1 focus:ring-[#1b64b3] focus:outline-none bg-white text-gray-900"
                >
                  <option value="Metric Tons (MT)">Metric Tons (MT)</option>
                  <option value="20ft Full Container (20' FCL)">20ft Full Container (20' FCL)</option>
                  <option value="40ft Full Container (40' FCL)">40ft Full Container (40' FCL)</option>
                  <option value="Kilograms (KG)">Kilograms (KG)</option>
                  <option value="Standard Bags / Master Cartons">Standard Bags / Master Cartons</option>
                </select>
              </div>
            </div>
          </div>

          {/* Personal & Business Info Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Robert Vance"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full h-12 px-4 text-sm border border-gray-300 focus:border-[#1b64b3] focus:ring-1 focus:ring-[#1b64b3] focus:outline-none text-gray-900"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                Work Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                required
                placeholder="name@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-12 px-4 text-sm border border-gray-300 focus:border-[#1b64b3] focus:ring-1 focus:ring-[#1b64b3] focus:outline-none text-gray-900"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                Phone / WhatsApp <span className="text-red-500">*</span>
              </label>
              <div className="flex gap-2">
                <div className="w-[110px] shrink-0">
                  <Select
                    instanceId="countryCodeSelect"
                    options={countryCodeOptions}
                    value={countryCodeOptions.find(opt => opt.value === countryCode) || countryCodeOptions[0]}
                    onChange={(selectedOption: any) => setCountryCode(selectedOption.value)}
                    styles={customSelectStyles}
                    isSearchable={false}
                  />
                </div>
                <input
                  type="tel"
                  required
                  placeholder="50 123 4567"
                  value={phone}
                  onChange={(e) => { const value = e.target.value.replace(/[^0-9+\s()-]/g, ""); setPhone(value); }}
                  className="w-full h-12 px-4 text-sm border border-gray-300 focus:border-[#1b64b3] focus:ring-1 focus:ring-[#1b64b3] focus:outline-none text-gray-900"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                Company Name
              </label>
              <input
                type="text"
                placeholder="Company / Import Business"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                className="w-full h-12 px-4 text-sm border border-gray-300 focus:border-[#1b64b3] focus:ring-1 focus:ring-[#1b64b3] focus:outline-none text-gray-900"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                Destination Country <span className="text-red-500">*</span>
              </label>
              <Select
                instanceId="destinationCountrySelect"
                options={countryOptions}
                value={countryOptions.find(opt => opt.value === country) || null}
                onChange={(selectedOption: any) => setCountry(selectedOption.value)}
                styles={customSelectStyles}
                placeholder="Select Destination Country"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                Incoterm & Delivery Terms
              </label>
              <select
                value={shippingTerm}
                onChange={(e) => setShippingTerm(e.target.value)}
                className="w-full h-12 px-3 text-sm border border-gray-300 focus:border-[#1b64b3] focus:ring-1 focus:ring-[#1b64b3] focus:outline-none text-gray-900 bg-white"
              >
                <option value="FOB India Port">FOB (Free On Board - Indian Port)</option>
                <option value="CIF Destination Port">CIF (Cost, Insurance & Freight)</option>
                <option value="CFR / CNF Destination Port">CFR / CNF (Cost & Freight)</option>
                <option value="EXW Factory">EXW (Ex-Works Sourcing Facility)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              Full Delivery Address / Import Facility Location
            </label>
            <textarea
              rows={2}
              placeholder="Street address, city, state/province, postal code, warehouse port details..."
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full p-3 text-sm border border-gray-300 focus:border-[#1b64b3] focus:ring-1 focus:ring-[#1b64b3] focus:outline-none text-gray-900 resize-y"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              Special Requirements / Packing Notes
            </label>
            <textarea
              rows={4}
              placeholder="Specify grain moisture %, custom branding/packaging, target delivery date..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full p-4 text-sm border border-gray-300 focus:border-[#1b64b3] focus:ring-1 focus:ring-[#1b64b3] focus:outline-none text-gray-900 resize-y"
            />
          </div>

          {/* Captcha Section */}
          <div className="space-y-2 pt-2 bg-gray-50 p-4 border border-gray-200">
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-700">
              Security Verification *
            </label>
            <div className="flex items-center gap-4">
              <div className="bg-[#011842] border border-gray-300 px-6 py-3 tracking-widest font-mono text-lg font-bold text-yellow-300 select-none">
                {captchaCode}
              </div>
              <button
                type="button"
                onClick={generateCaptcha}
                className="text-xs text-[#1b64b3] underline hover:text-[#011842]"
              >
                Refresh Code
              </button>
            </div>
            <input
              type="text"
              name="captchaInput"
              required
              placeholder="Enter the code shown above"
              value={captchaInput}
              onChange={(e) => setCaptchaInput(e.target.value)}
              className="w-full h-11 px-4 text-sm bg-white border border-gray-300 text-gray-900 placeholder-gray-400 focus:border-[#1b64b3] focus:outline-none"
            />
          </div>

          <Button
            type="submit"
            variant="primary"
            className="w-full h-12 lg:h-16 text-sm lg:text-base tracking-widest font-bold flex items-center justify-center gap-3 mt-4 py-6 disabled:opacity-50"
          >
            <span>{isSubmitting ? "Submitting Enquiry..." : "Submit Export Enquiry"}</span>
            {!isSubmitting && (
              <svg className="w-5 h-5 rotate-45" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            )}
          </Button>
        </form>
      </div>

      {isSubmitted && (
        <EnquirySuccessModal 
          product={product}
          name={name}
          quantity={quantity}
          unit={unit}
          country={country}
          shippingTerm={shippingTerm}
          referenceNumber={referenceNumber}
        />
      )}
    </>
  );
}