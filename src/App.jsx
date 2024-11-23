/* eslint-disable react/prop-types */
"use client";

import { useState, useEffect, useMemo } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import { SemiCircleProgress } from "react-semicircle-progressbar";
import RevealText from "./components/RevealText";

// The JSON data
const carData = [
  {
    brand: "Abarth",
    models: [
      {
        name: "500",
        year: [
          {
            value: 2012,
            bodyStyle: ["Cabrio", "Limousine"],
            fuelType: "Benzin",
            variants: [
              {
                name: "1.4 Turbo",
                power: ["103 kW / 140 PS", "99 kW / 135 PS"],
                transmission: ["Schaltgetriebe", "Halbautomatik"],
                doors: "2 Türer",
                modelType: "Andere",
                mileage: 300,
              },
            ],
          },
        ],
      },
    ],
  },
];

export default function DynamicCarDetailsForm() {
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState("");
  const [bodyStyle, setBodyStyle] = useState("");
  const [variant, setVariant] = useState("");
  const [power, setPower] = useState("");
  const [transmission, setTransmission] = useState("");
  const [kilometers, setKilometers] = useState("");
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [selectedDecision, setSelectedDecision] = useState("");
  const [planSell, setPlanSell] = useState("");
  const [preferSell, setPreferSell] = useState("");

  const decisions = ["Ja", "Nein"];

  const brands = carData.map((b) => b.brand);
  const models = brand
    ? carData.find((b) => b.brand === brand)?.models.map((m) => m.name) || []
    : [];
  const years = model
    ? carData
        .find((b) => b.brand === brand)
        ?.models.find((m) => m.name === model)
        ?.year.map((y) => y.value) || []
    : [];

  const selectedYear = year
    ? carData
        .find((b) => b.brand === brand)
        ?.models.find((m) => m.name === model)
        ?.year.find((y) => y.value === year)
    : null;

  const bodyStyles = selectedYear?.bodyStyle || [];
  const fuelType = selectedYear?.fuelType || "";
  const variants = useMemo(
    () => selectedYear?.variants.map((v) => v.name) || [],
    [selectedYear]
  );

  const selectedVariant =
    selectedYear?.variants.find((v) => v.name === variant) ||
    (variants.length === 1 ? selectedYear?.variants[0] : null);

  const isMileageIncorrect =
    kilometers && parseInt(kilometers) !== selectedVariant.mileage;

  const doors = selectedVariant ? selectedVariant.doors : "";
  const modelType = selectedVariant ? selectedVariant.modelType : "";

  useEffect(() => {
    setModel("");
    setYear("");
    resetFields();
  }, [brand]);

  useEffect(() => {
    setYear("");
    resetFields();
  }, [model]);

  useEffect(() => {
    resetFields();
  }, [year]);

  useEffect(() => {
    if (variants.length === 1) {
      setVariant(variants[0]);
    }
  }, [variants]);

  const resetFields = () => {
    setBodyStyle("");
    setVariant("");
    setPower("");
    setTransmission("");
    setKilometers("");
    setPlanSell("");
    setPreferSell("");
    setSelectedDecision("");
    setEmail("");
    setConsent(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Selected values:", {
      brand,
      model,
      year,
      bodyStyle,
      fuelType,
      variant,
      power,
      transmission,
      doors,
      modelType,
      kilometers,
      email,
      consent,
      selectedDecision,
      planSell,
      preferSell,
    });
  };

  const fieldsFilled = [
    brand,
    model,
    year,
    bodyStyle,
    fuelType,
    variant,
    power,
    transmission,
    doors,
    modelType,
    kilometers,
    email,
    consent,
    selectedDecision,
    planSell,
    preferSell,
  ].filter(Boolean).length;

  const progress = Math.round((fieldsFilled / 16) * 100);

  const CustomSelect = ({
    value,
    onChange,
    options,
    placeholder,
    disabled = false,
  }) => (
    <div className="relative">
      <select
        value={value}
        onChange={onChange}
        disabled={disabled}
        className="appearance-none w-full px-2 py-2 bg-white border-2 disabled:border-[1px] border-[#EE202C] rounded text-base focus:outline-none focus:border-[#EE202C] disabled:bg-[#EE202C]/10 disabled:border-[#EE202C]/10 disabled:cursor-not-allowed"
      >
        <option value="">{placeholder}</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-[#EE202C]">
        <ChevronDown className="h-5 w-5" />
      </div>
    </div>
  );

  const SelectableButtons = ({ options, selectedValue, onSelect }) => (
    <div className="flex flex-wrap gap-2">
      {options.map((option) => (
        <button
          key={option}
          type="button"
          onClick={() => onSelect(option)}
          className={`px-4 py-2 border-2 rounded flex-1 ${
            selectedValue === option
              ? "border-[#EE202C] text-[#EE202C]"
              : "border-[#EE202C]/10 text-gray-700"
          }`}
        >
          {option}
        </button>
      ))}
    </div>
  );

  return (
    <div className="mx-auto max-w-3xl p-6">
      <div className="space-y-8">
        <div className="space-y-2 text-center">
          <h1 className="text-5xl font-bold tracking-tight text-[#EE202C] sm:text-4xl md:text-5xl">
            Verkaufe dein Auto <RevealText />
          </h1>
          <p className="mx-auto max-w-[600px] text-gray-600">
            Ohne Stress zum Mega Preis - Erhalte direkt deinen finalen
            Verkaufspreis und buche deinen Abgabe-Termin online
          </p>
        </div>
        <div className="flex md:flex-row gap-y-4 flex-col justify-center md:items-end">
          <form onSubmit={handleSubmit} className="space-y-6 md:px-16 flex-1">
            <div className="space-y-2">
              <label className="block text-lg font-medium text-gray-700">
                Von welcher Marke ist dein Auto?
              </label>
              <CustomSelect
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                options={brands}
                placeholder="Marke auswählen"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-lg font-medium text-gray-700">
                Welches Modell?
              </label>
              <CustomSelect
                value={model}
                onChange={(e) => setModel(e.target.value)}
                options={models}
                placeholder="Modell auswählen"
                disabled={!brand}
              />
            </div>

            <div className="space-y-2">
              <label className="block text-lg font-medium text-gray-700">
                In welchem Jahr wurde es zugelassen?
              </label>
              <CustomSelect
                value={year}
                onChange={(e) => setYear(Number(e.target.value))}
                options={years}
                placeholder="Erstzulassung auswählen"
                disabled={!model}
              />
            </div>

            {year && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="block text-lg font-medium text-gray-700">
                    Welche Bauform hat es?
                  </label>
                  {bodyStyles.length === 1 ? (
                    <input
                      type="text"
                      value={bodyStyles[0]}
                      className="w-full px-4 py-3 text-center bg-white border-2 text-[#EE202C] font-medium border-[#EE202C] rounded text-base focus:outline-none"
                      readOnly
                    />
                  ) : (
                    <SelectableButtons
                      options={bodyStyles}
                      selectedValue={bodyStyle}
                      onSelect={setBodyStyle}
                    />
                  )}
                </div>
                {(bodyStyle || bodyStyles.length === 1) && (
                  <div className="space-y-2">
                    <label className="block text-lg font-medium text-gray-700">
                      Welchen Kraftstoff tankt es?
                    </label>
                    <input
                      type="text"
                      value={fuelType}
                      className="w-full px-4 py-3 text-center bg-white border-2 text-[#EE202C] font-medium border-[#EE202C] rounded text-base focus:outline-none"
                      readOnly
                    />
                  </div>
                )}
                {(bodyStyle || bodyStyles.length === 1) && (
                  <div className="space-y-2">
                    <label className="block text-lg font-medium text-gray-700">
                      Um welche Modellvariante handelt es sich?
                    </label>
                    {variants.length === 1 ? (
                      <input
                        type="text"
                        value={variants[0]}
                        className="w-full px-4 py-3 text-center bg-white border-2 text-[#EE202C] font-medium border-[#EE202C] rounded text-base focus:outline-none"
                        readOnly
                      />
                    ) : (
                      <SelectableButtons
                        options={variants}
                        selectedValue={variant}
                        onSelect={setVariant}
                      />
                    )}
                  </div>
                )}

                {(bodyStyle || bodyStyles.length === 1) && selectedVariant && (
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <label className="block text-lg font-medium text-gray-700">
                        Wie viele PS hat es?
                      </label>
                      <SelectableButtons
                        options={selectedVariant.power}
                        selectedValue={power}
                        onSelect={setPower}
                      />
                    </div>
                    {power && (
                      <div className="space-y-2">
                        <label className="block text-lg font-medium text-gray-700">
                          Welches Getriebe hat es?
                        </label>
                        {selectedVariant.transmission.length === 1 ? (
                          <input
                            type="text"
                            value={selectedVariant.transmission[0]}
                            className="w-full px-4 py-3 text-center bg-white border-2 text-[#EE202C] font-medium border-[#EE202C] rounded text-base focus:outline-none"
                            readOnly
                          />
                        ) : (
                          <SelectableButtons
                            options={selectedVariant.transmission}
                            selectedValue={transmission}
                            onSelect={setTransmission}
                          />
                        )}
                      </div>
                    )}
                    {power &&
                      (transmission ||
                        selectedVariant.transmission.length === 1) && (
                        <div className="space-y-2">
                          <label className="block text-lg font-medium text-gray-700">
                            Wie viele Türen hat es?
                          </label>
                          <input
                            type="text"
                            value={selectedVariant.doors}
                            className="w-full px-4 py-3 bg-white border-2 text-[#EE202C] text-center font-medium border-[#EE202C] rounded text-base focus:outline-none"
                            readOnly
                          />
                        </div>
                      )}
                    {power &&
                      (transmission ||
                        selectedVariant.transmission.length === 1) && (
                        <div className="space-y-2">
                          <label className="block text-lg font-medium text-gray-700">
                            Welcher Modelltyp ist es?
                          </label>
                          <input
                            type="text"
                            value={selectedVariant.modelType}
                            className="w-full px-4 py-3 bg-white border-2 text-[#EE202C] text-center font-medium border-[#EE202C] rounded text-base focus:outline-none"
                            readOnly
                          />
                        </div>
                      )}
                    {power &&
                      (transmission ||
                        selectedVariant.transmission.length === 1) && (
                        <div className="space-y-2">
                          <label className="block text-lg font-medium text-gray-700">
                            Wie ist der Kilometerstand?
                          </label>
                          <div className="flex items-center relative">
                            <input
                              type="text"
                              value={kilometers}
                              onChange={(e) => setKilometers(e.target.value)}
                              className="relative w-full px-4 py-3 bg-[#EE202C]/10 border-2 border-[#EE202C]/10 focus:border-[#EE202C] rounded text-base focus:outline-none"
                              placeholder={selectedVariant.mileage.toString()}
                            />
                            <span className="absolute top-3 right-3 text-lg">
                              km
                            </span>
                          </div>
                          {isMileageIncorrect && (
                            <div className="mt-2 p-3 bg-[#EE202C]/20 border border-[#EE202C] text-[#EE202C] rounded">
                              Basierend auf unserer Erfahrung hast du
                              möglicherweise einen falschen Wert eingegeben.
                              Bitte kontrolliere deine Eingabe.
                            </div>
                          )}
                        </div>
                      )}

                    {kilometers && (
                      <div className="space-y-6">
                        <div className="space-y-2">
                          <label className="block text-lg font-medium text-gray-700">
                            Wann planst du den Verkauf?
                          </label>
                          <CustomSelect
                            value={planSell}
                            onChange={(e) => setPlanSell(e.target.value)}
                            options={[
                              "In den nächsten 3 Monaten",
                              "In den nächsten 6 Monaten",
                              "In den nächsten 12 Monaten",
                            ]}
                            placeholder="Zeitraum auswählen"
                          />
                        </div>
                        {planSell && (
                          <div className="space-y-2">
                            <label className="block text-lg font-medium text-gray-700">
                              An wen bevorzugst du zu verkaufen?
                            </label>
                            <CustomSelect
                              value={preferSell}
                              onChange={(e) => setPreferSell(e.target.value)}
                              options={["An Privat", "An Händler", "An Export"]}
                              placeholder="Käufer auswählen"
                            />
                          </div>
                        )}

                        {preferSell && (
                          <div className="space-y-2">
                            <label className="block text-lg font-medium text-gray-700">
                              Planst du, dein Auto für ein neues in Zahlung zu
                              geben?
                            </label>
                            <div className="flex space-x-4">
                              {decisions.map((decision) => (
                                <button
                                  key={decision}
                                  type="button"
                                  onClick={() => setSelectedDecision(decision)}
                                  className={`px-4 py-2 border-2 rounded flex-1 ${
                                    selectedDecision === decision
                                      ? "border-[#EE202C] text-[#EE202C]"
                                      : "border-gray-200 text-gray-700"
                                  }`}
                                >
                                  {decision}
                                </button>
                              ))}
                            </div>
                          </div>
                        )}
                        {preferSell && (
                          <div className="space-y-2">
                            <label className="block text-lg font-medium text-gray-700">
                              Wohin können wir das Verkaufsangebot schicken?
                            </label>
                            <input
                              type="email"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              required
                              className="w-full px-4 py-3 bg-white border-2 border-[#EE202C] rounded text-base focus:outline-none"
                              placeholder="Bitte E-Mail-Adresse eingeben"
                            />
                          </div>
                        )}
                        {preferSell && (
                          <div className="flex items-center space-x-2 border-[1px] border-solid border-black px-2 py-4 rounded-md">
                            <div className="checkbox-wrapper relative h-[18px]">
                              <input
                                type="checkbox"
                                checked={consent}
                                onChange={(e) => setConsent(e.target.checked)}
                                className="checkbox-input"
                                id="custom-checkbox"
                              />
                              <label
                                htmlFor="custom-checkbox"
                                className="custom-checkbox"
                              ></label>
                            </div>
                            <label className="text-sm text-gray-700">
                              Ich bin mit dem Erhalt meiner Bewertung per E-Mail
                              sowie werblicher E-Mails zum Service von WKDA GmbH
                              einverstanden (keine Sorge, du kannst dich
                              jederzeit wieder abmelden).
                            </label>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            <button
              type="submit"
              className="w-[90%] mx-auto bg-[#E87524] hover:bg-[#E87524]/90 text-white py-3 px-4 rounded text-lg font-semibold flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span>Bewertung ansehen</span>
              <ChevronRight className="mt-1 h-[25px] w-[25px]" />
            </button>
          </form>
          {/*  Progress */}
          <div className="flex items-center flex-col justify-center mb-6">
            <div className="relative w-24 h-24">
              <SemiCircleProgress
                percentage={progress}
                size={{
                  width: 96,
                  height: 96,
                }}
                strokeWidth={10}
                strokeColor="#10b981"
              />
            </div>
            <span className="ml-2 text-gray-700">abgeschlossen</span>
          </div>
        </div>
      </div>
    </div>
  );
}
