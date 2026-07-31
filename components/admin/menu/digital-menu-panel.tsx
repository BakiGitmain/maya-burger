"use client";

/* eslint-disable @next/next/no-img-element */

import Image from "next/image";
import Link from "next/link";
import {
  Check,
  Copy,
  Download,
  ExternalLink,
  ImageIcon,
  Link2,
  Maximize2,
  PackageCheck,
  Printer,
  QrCode,
  RotateCcw,
  Smartphone,
  UtensilsCrossed,
  X,
} from "lucide-react";
import { QRCodeCanvas } from "qrcode.react";
import {
  useMemo,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";

import type { Burger } from "@/lib/types/burger";

type DigitalMenuPanelProps = {
  burgers: Burger[];
  loading: boolean;
};

const FALLBACK_SITE_URL =
  "https://maya-burger.vercel.app";

const DEFAULT_OREO_SHAKE_IMAGE =
  "https://images.pexels.com/photos/17321330/pexels-photo-17321330.jpeg?auto=compress&cs=tinysrgb&w=1200";

const IPHONE_FRAME_URL =
  "https://upload.wikimedia.org/wikipedia/commons/f/f5/IPhone_15_Pro_Vector.svg";

const IPHONE_FRAME_SOURCE =
  "https://commons.wikimedia.org/wiki/File:IPhone_15_Pro_Vector.svg";

const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ||
  FALLBACK_SITE_URL
).replace(/\/+$/, "");

const menuUrl = `${siteUrl}/menu`;

// Change this number whenever you want the fake QR preview larger or smaller.
// The image will still shrink automatically on narrow mobile screens.
const QR_PREVIEW_MAX_SIZE = 320;

function formatPrice(price: string) {
  const value = Number(price);

  if (!Number.isFinite(value)) {
    return price;
  }

  return new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 2,
  }).format(value);
}

function escapeHtml(value: string) {
  const characters: Record<string, string> = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  };

  return value.replace(
    /[&<>"']/g,
    (character) => characters[character]
  );
}

function getBurgerSearchText(item: Burger) {
  return [
    item.name,
    item.category,
    item.description ?? "",
  ]
    .join(" ")
    .toLowerCase();
}

export default function DigitalMenuPanel({
  burgers,
  loading,
}: DigitalMenuPanelProps) {
  const qrCanvasRef =
    useRef<HTMLCanvasElement | null>(null);

  const [qrName, setQrName] = useState(
    "Main Dining Menu"
  );

  const [includeLogo, setIncludeLogo] =
    useState(true);

  const [copied, setCopied] =
    useState(false);

  const availableItems = useMemo(
    () =>
      burgers.filter(
        (burger) => burger.isAvailable
      ),
    [burgers]
  );

  const previewItems = useMemo(
    () => availableItems.slice(0, 3),
    [availableItems]
  );

  const stats = [
    {
      label: "QR Menus",
      value: "1",
      helper: "Permanent menu code",
      icon: QrCode,
      className:
        "bg-amber-100 text-amber-700 dark:bg-amber-400/15 dark:text-amber-300",
    },
    {
      label: "QR Status",
      value: "Active",
      helper: "Ready for customers",
      icon: PackageCheck,
      className:
        "bg-emerald-100 text-emerald-700 dark:bg-emerald-400/15 dark:text-emerald-300",
    },
    {
      label: "Menu Items",
      value: burgers.length.toString(),
      helper: "Items connected",
      icon: UtensilsCrossed,
      className:
        "bg-sky-100 text-sky-700 dark:bg-sky-400/15 dark:text-sky-300",
    },
    {
      label: "Available",
      value:
        availableItems.length.toString(),
      helper: "Visible to customers",
      icon: Smartphone,
      className:
        "bg-violet-100 text-violet-700 dark:bg-violet-400/15 dark:text-violet-300",
    },
  ];

  async function handleCopyLink() {
    try {
      await navigator.clipboard.writeText(
        menuUrl
      );
    } catch {
      const textarea =
        document.createElement("textarea");

      textarea.value = menuUrl;
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";

      document.body.appendChild(textarea);
      textarea.select();

      document.execCommand("copy");
      textarea.remove();
    }

    setCopied(true);

    window.setTimeout(() => {
      setCopied(false);
    }, 2000);
  }

  function handleDownload() {
    const canvas = qrCanvasRef.current;

    if (!canvas) {
      return;
    }

    canvas.toBlob(
      (blob) => {
        if (!blob) {
          return;
        }

        const objectUrl =
          URL.createObjectURL(blob);

        const link =
          document.createElement("a");

        link.href = objectUrl;
        link.download =
          "maya-burger-menu-qr.png";

        document.body.appendChild(link);
        link.click();
        link.remove();

        URL.revokeObjectURL(objectUrl);
      },
      "image/png",
      1
    );
  }

  function handlePrint() {
    const canvas = qrCanvasRef.current;

    if (!canvas) {
      return;
    }

    const printWindow = window.open(
      "",
      "_blank",
      "width=950,height=1100"
    );

    if (!printWindow) {
      return;
    }

    const qrImage = canvas.toDataURL(
      "image/png",
      1
    );

    const safeQrName =
      escapeHtml(qrName.trim()) ||
      "Main Dining Menu";

    const safeMenuUrl =
      escapeHtml(menuUrl);

    const logoUrl = escapeHtml(
      new URL(
        "/images/maya_logo.png",
        window.location.origin
      ).href
    );

    const burgerItem =
      availableItems.find((item) => {
        const searchText =
          getBurgerSearchText(item);

        return (
          searchText.includes("burger") &&
          Boolean(item.imageUrl)
        );
      }) ??
      availableItems.find((item) =>
        Boolean(item.imageUrl)
      );

    const shakeItem =
      availableItems.find((item) => {
        const searchText =
          getBurgerSearchText(item);

        return (
          Boolean(item.imageUrl) &&
          (searchText.includes("oreo") ||
            searchText.includes("shake") ||
            searchText.includes(
              "milkshake"
            ))
        );
      });

    const burgerImageUrl =
      burgerItem?.imageUrl
        ? escapeHtml(burgerItem.imageUrl)
        : "";

    const shakeImageUrl = escapeHtml(
      shakeItem?.imageUrl ||
        DEFAULT_OREO_SHAKE_IMAGE
    );

    const burgerName = escapeHtml(
      burgerItem?.name ||
        "Signature Maya Burger"
    );

    const burgerPrice = burgerItem
      ? `ETB ${escapeHtml(
          formatPrice(burgerItem.price)
        )}`
      : "Freshly prepared";

    const shakeName = escapeHtml(
      shakeItem?.name || "Oreo Shake"
    );

    const shakePrice = shakeItem
      ? `ETB ${escapeHtml(
          formatPrice(shakeItem.price)
        )}`
      : "Creamy & cold";

    const burgerMarkup = burgerImageUrl
      ? `
        <div class="burger-photo-shell">
          <img
            src="${burgerImageUrl}"
            alt="${burgerName}"
            class="burger-photo"
          />
        </div>
      `
      : `
        <div class="burger-placeholder">
          <img
            src="${logoUrl}"
            alt="Maya Burger"
          />

          <p>Signature Burger</p>
        </div>
      `;

    printWindow.document.write(`
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />

          <meta
            name="viewport"
            content="width=device-width, initial-scale=1"
          />

          <title>
            ${safeQrName} - Maya Burger
          </title>

          <style>
            @page {
              size: A4 portrait;
              margin: 0;
            }

            * {
              box-sizing: border-box;
              -webkit-print-color-adjust: exact;
              print-color-adjust: exact;
            }

            html,
            body {
              margin: 0;
              padding: 0;
              background: #111111;
              font-family:
                Arial,
                Helvetica,
                sans-serif;
            }

            body {
              display: flex;
              justify-content: center;
              min-height: 100vh;
            }

            .poster {
              position: relative;
              width: 210mm;
              height: 297mm;
              overflow: hidden;
              color: #ffffff;
              background:
                radial-gradient(
                  circle at 80% 5%,
                  rgba(255, 196, 0, 0.12),
                  transparent 28%
                ),
                radial-gradient(
                  circle at 10% 85%,
                  rgba(255, 196, 0, 0.08),
                  transparent 30%
                ),
                #050505;
              isolation: isolate;
            }

            .poster::before {
              content: "";
              position: absolute;
              inset: 0;
              z-index: 30;
              pointer-events: none;
              opacity: 0.12;
              background-image:
                radial-gradient(
                  rgba(255, 255, 255, 0.65)
                  0.4px,
                  transparent 0.4px
                );
              background-size: 5px 5px;
              mix-blend-mode: soft-light;
            }

            .top-line {
              position: absolute;
              top: 0;
              left: 0;
              right: 0;
              height: 4mm;
              background: #ffc400;
            }

            .circle-decoration {
              position: absolute;
              top: -34mm;
              right: -32mm;
              width: 92mm;
              height: 92mm;
              border: 16mm solid #ffc400;
              border-radius: 50%;
              opacity: 0.95;
            }

            .dots {
              position: absolute;
              top: 41mm;
              right: 10mm;
              width: 34mm;
              height: 28mm;
              opacity: 0.2;
              background-image:
                radial-gradient(
                  #ffc400 1.2px,
                  transparent 1.2px
                );
              background-size: 5px 5px;
              transform: rotate(-8deg);
            }

            .header {
              position: relative;
              z-index: 4;
              display: flex;
              align-items: center;
              justify-content: space-between;
              padding: 11mm 13mm 0;
            }

            .brand {
              display: flex;
              align-items: center;
              gap: 3.5mm;
            }

            .brand img {
              width: 15mm;
              height: 15mm;
              object-fit: contain;
            }

            .brand-name {
              margin: 0;
              color: #ffffff;
              font-size: 13px;
              font-weight: 900;
              letter-spacing: 0.08em;
              text-transform: uppercase;
            }

            .brand-subtitle {
              margin: 1.5mm 0 0;
              color: #ffc400;
              font-size: 7px;
              font-weight: 900;
              letter-spacing: 0.24em;
              text-transform: uppercase;
            }

            .live-badge {
              display: flex;
              align-items: center;
              gap: 2.5mm;
              padding: 2.5mm 4mm;
              border: 1px solid
                rgba(255, 196, 0, 0.35);
              border-radius: 999px;
              color: #ffc400;
              background:
                rgba(255, 196, 0, 0.08);
              font-size: 7px;
              font-weight: 900;
              letter-spacing: 0.17em;
              text-transform: uppercase;
            }

            .live-badge span {
              width: 2mm;
              height: 2mm;
              border-radius: 50%;
              background: #ffc400;
              box-shadow:
                0 0 0 1.5mm
                rgba(255, 196, 0, 0.12);
            }

            .intro {
              position: relative;
              z-index: 4;
              padding: 12mm 13mm 8mm;
            }

            .eyebrow {
              margin: 0 0 3mm;
              color: #ffc400;
              font-size: 8px;
              font-weight: 900;
              letter-spacing: 0.23em;
              text-transform: uppercase;
            }

            .intro h1 {
              max-width: 165mm;
              margin: 0;
              color: #ffffff;
              font-family:
                "Arial Black",
                Impact,
                sans-serif;
              font-size: 36px;
              line-height: 0.92;
              letter-spacing: -0.055em;
              text-transform: uppercase;
            }

            .intro h1 span {
              color: #ffc400;
            }

            .intro-description {
              max-width: 125mm;
              margin: 4mm 0 0;
              color: #9b9b9b;
              font-size: 9px;
              line-height: 1.6;
            }

            .menu-card {
              position: relative;
              z-index: 5;
              display: grid;
              grid-template-columns:
                27mm 94mm minmax(0, 1fr);
              width: calc(100% - 26mm);
              min-height: 117mm;
              margin: 0 13mm;
              overflow: hidden;
              border-radius: 7mm;
              box-shadow:
                0 13mm 30mm
                rgba(0, 0, 0, 0.5);
            }

            .menu-side {
              display: flex;
              align-items: center;
              justify-content: center;
              overflow: hidden;
              color: #080808;
              background: #ffc400;
            }

            .menu-side span {
              font-family:
                "Arial Black",
                Impact,
                sans-serif;
              font-size: 29px;
              letter-spacing: 0.04em;
              text-transform: uppercase;
              transform: rotate(-90deg);
              white-space: nowrap;
            }

            .qr-area {
              display: flex;
              flex-direction: column;
              justify-content: center;
              padding: 8mm;
              color: #080808;
              background: #ffffff;
            }

            .qr-header {
              display: flex;
              align-items: center;
              justify-content: space-between;
              margin-bottom: 4mm;
            }

            .qr-header p {
              margin: 0;
              color: #777777;
              font-size: 6.5px;
              font-weight: 900;
              letter-spacing: 0.17em;
              text-transform: uppercase;
            }

            .qr-header strong {
              display: block;
              margin-top: 1mm;
              color: #080808;
              font-size: 11px;
              text-transform: uppercase;
            }

            .qr-header img {
              width: 12mm;
              height: 12mm;
              object-fit: contain;
            }

            .qr-frame {
              padding: 3mm;
              border: 1.4px solid #dddddd;
              border-radius: 5mm;
              background: #ffffff;
            }

            .qr-frame img {
              display: block;
              width: 100%;
              height: auto;
            }

            .scan-footer {
              display: flex;
              align-items: center;
              justify-content: space-between;
              gap: 4mm;
              margin-top: 4mm;
            }

            .scan-footer p {
              margin: 0;
              color: #777777;
              font-size: 6.5px;
              font-weight: 900;
              letter-spacing: 0.12em;
              text-transform: uppercase;
            }

            .scan-footer strong {
              display: block;
              margin-top: 1mm;
              color: #080808;
              font-family:
                "Arial Black",
                Impact,
                sans-serif;
              font-size: 14px;
              line-height: 1;
              text-transform: uppercase;
            }

            .arrow {
              width: 11mm;
              height: 11mm;
              display: flex;
              align-items: center;
              justify-content: center;
              flex-shrink: 0;
              border-radius: 50%;
              color: #080808;
              background: #ffc400;
              font-size: 19px;
              font-weight: 900;
            }

            .instructions {
              position: relative;
              display: flex;
              flex-direction: column;
              justify-content: space-between;
              padding: 10mm 8mm;
              overflow: hidden;
              background:
                linear-gradient(
                  145deg,
                  #181818,
                  #080808
                );
              border-left: 1px solid
                rgba(255, 255, 255, 0.1);
            }

            .instructions::after {
              content: "";
              position: absolute;
              right: -14mm;
              bottom: -14mm;
              width: 44mm;
              height: 44mm;
              border: 8mm solid
                rgba(255, 196, 0, 0.08);
              border-radius: 50%;
            }

            .instructions-label {
              margin: 0;
              color: #ffc400;
              font-size: 7px;
              font-weight: 900;
              letter-spacing: 0.2em;
              text-transform: uppercase;
            }

            .instructions h2 {
              margin: 4mm 0 0;
              color: #ffffff;
              font-family:
                "Arial Black",
                Impact,
                sans-serif;
              font-size: 23px;
              line-height: 0.98;
              letter-spacing: -0.04em;
              text-transform: uppercase;
            }

            .instructions h2 span {
              color: #ffc400;
            }

            .instructions-description {
              margin: 4mm 0 0;
              color: #999999;
              font-size: 8px;
              line-height: 1.55;
            }

            .steps {
              position: relative;
              z-index: 2;
              display: grid;
              gap: 3mm;
              margin-top: 6mm;
            }

            .step {
              display: flex;
              align-items: center;
              gap: 3mm;
              color: #d4d4d4;
              font-size: 7.5px;
              font-weight: 700;
            }

            .step span {
              width: 7mm;
              height: 7mm;
              display: flex;
              align-items: center;
              justify-content: center;
              flex-shrink: 0;
              border: 1px solid
                rgba(255, 196, 0, 0.4);
              border-radius: 50%;
              color: #ffc400;
              background:
                rgba(255, 196, 0, 0.09);
              font-size: 7px;
              font-weight: 900;
            }

            .no-app {
              position: relative;
              z-index: 2;
              display: flex;
              align-items: center;
              gap: 2mm;
              padding-top: 4mm;
              border-top: 1px solid
                rgba(255, 255, 255, 0.1);
              color: #777777;
              font-size: 6.5px;
              font-weight: 900;
              letter-spacing: 0.12em;
              text-transform: uppercase;
            }

            .no-app span {
              width: 2mm;
              height: 2mm;
              border-radius: 50%;
              background: #ffc400;
            }

            .products {
              position: relative;
              z-index: 4;
              height: 77mm;
              margin-top: 6mm;
              overflow: hidden;
            }

            .yellow-background {
              position: absolute;
              left: -18mm;
              right: -18mm;
              bottom: 2mm;
              height: 46mm;
              background: #ffc400;
              transform: skewY(-5deg);
            }

            .product-heading {
              position: absolute;
              top: 9mm;
              left: 13mm;
              z-index: 7;
              max-width: 64mm;
            }

            .product-heading p {
              margin: 0;
              color: #ffc400;
              font-size: 7px;
              font-weight: 900;
              letter-spacing: 0.21em;
              text-transform: uppercase;
            }

            .product-heading h2 {
              margin: 3mm 0 0;
              color: #ffffff;
              font-family:
                "Arial Black",
                Impact,
                sans-serif;
              font-size: 22px;
              line-height: 0.95;
              letter-spacing: -0.04em;
              text-transform: uppercase;
            }

            .product-heading h2 span {
              display: block;
              margin-top: 3mm;
              color: #080808;
            }

            .burger-product {
              position: absolute;
              left: 70mm;
              bottom: 1mm;
              z-index: 8;
              width: 82mm;
            }

            .burger-photo-shell {
              width: 100%;
              height: 59mm;
              overflow: hidden;
              border: 2mm solid #111111;
              border-radius:
                25mm 25mm 5mm 5mm;
              background: #111111;
              transform: rotate(-2deg);
              box-shadow:
                0 7mm 14mm
                rgba(0, 0, 0, 0.38);
            }

            .burger-photo {
              width: 100%;
              height: 100%;
              display: block;
              object-fit: cover;
              object-position: center;
              filter:
                saturate(1.12)
                contrast(1.08);
            }

            .burger-placeholder {
              width: 100%;
              height: 59mm;
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              border: 2mm solid #111111;
              border-radius:
                25mm 25mm 5mm 5mm;
              background:
                radial-gradient(
                  circle,
                  rgba(255, 196, 0, 0.2),
                  transparent 60%
                ),
                #111111;
            }

            .burger-placeholder img {
              width: 30mm;
              height: 30mm;
              object-fit: contain;
            }

            .burger-placeholder p {
              margin: 2mm 0 0;
              color: #ffc400;
              font-size: 7px;
              font-weight: 900;
              text-transform: uppercase;
            }

            .burger-tag {
              position: absolute;
              left: 76mm;
              bottom: 2mm;
              z-index: 12;
              max-width: 73mm;
              padding: 2.5mm 4mm;
              border-radius: 999px;
              color: #ffffff;
              background: #080808;
              box-shadow:
                0 3mm 7mm
                rgba(0, 0, 0, 0.3);
            }

            .burger-tag strong {
              display: block;
              overflow: hidden;
              font-size: 7.5px;
              text-overflow: ellipsis;
              text-transform: uppercase;
              white-space: nowrap;
            }

            .burger-tag span {
              display: block;
              margin-top: 1mm;
              color: #ffc400;
              font-size: 6.5px;
              font-weight: 900;
            }

            .shake-product {
              position: absolute;
              right: 9mm;
              bottom: 2mm;
              z-index: 10;
              width: 45mm;
              height: 68mm;
            }

            .shake-photo-shell {
              position: relative;
              width: 100%;
              height: 100%;
              overflow: hidden;
              border: 2mm solid #111111;
              border-radius:
                21mm 21mm 7mm 7mm;
              background: #111111;
              transform: rotate(3deg);
              box-shadow:
                0 7mm 14mm
                rgba(0, 0, 0, 0.38);
            }

            .shake-photo-shell::after {
              content: "";
              position: absolute;
              inset: 0;
              pointer-events: none;
              background:
                linear-gradient(
                  180deg,
                  transparent 52%,
                  rgba(0, 0, 0, 0.3)
                );
            }

            .shake-photo {
              width: 100%;
              height: 100%;
              display: block;
              object-fit: cover;
              object-position: 50% 55%;
              filter:
                saturate(1.08)
                contrast(1.08)
                brightness(0.95);
            }

            .shake-tag {
              position: absolute;
              right: 7mm;
              bottom: 1mm;
              z-index: 14;
              max-width: 50mm;
              padding: 2.5mm 3.5mm;
              border-radius: 999px;
              color: #080808;
              background: #ffffff;
              box-shadow:
                0 3mm 7mm
                rgba(0, 0, 0, 0.24);
            }

            .shake-tag strong {
              display: block;
              overflow: hidden;
              font-size: 7px;
              text-overflow: ellipsis;
              text-transform: uppercase;
              white-space: nowrap;
            }

            .shake-tag span {
              display: block;
              margin-top: 1mm;
              color: #8b6500;
              font-size: 6px;
              font-weight: 900;
            }

            .footer {
              position: absolute;
              left: 13mm;
              right: 13mm;
              bottom: 6mm;
              z-index: 20;
              display: flex;
              align-items: center;
              justify-content: space-between;
              gap: 6mm;
              padding-top: 3.5mm;
              border-top: 1px solid
                rgba(255, 255, 255, 0.13);
            }

            .footer p {
              margin: 0;
            }

            .footer-url {
              min-width: 0;
              overflow: hidden;
              color: #909090;
              font-size: 6.5px;
              text-overflow: ellipsis;
              white-space: nowrap;
            }

            .footer-tagline {
              flex-shrink: 0;
              color: #ffffff;
              font-size: 6.5px;
              font-weight: 900;
              letter-spacing: 0.14em;
              text-transform: uppercase;
            }

            .footer-tagline span {
              color: #ffc400;
            }

            @media screen {
              body {
                padding: 30px;
              }

              .poster {
                box-shadow:
                  0 30px 100px
                  rgba(0, 0, 0, 0.6);
              }
            }

            @media print {
              html,
              body {
                width: 210mm;
                height: 297mm;
                background: #050505;
              }

              body {
                padding: 0;
              }

              .poster {
                width: 210mm;
                height: 297mm;
                box-shadow: none;
                page-break-after: avoid;
                page-break-inside: avoid;
              }
            }
          </style>
        </head>

        <body>
          <main class="poster">
            <div class="top-line"></div>
            <div class="circle-decoration"></div>
            <div class="dots"></div>

            <header class="header">
              <div class="brand">
                <img
                  src="${logoUrl}"
                  alt="Maya Burger"
                />

                <div>
                  <p class="brand-name">
                    Maya Burger
                  </p>

                  <p class="brand-subtitle">
                    Cravings Satisfied
                  </p>
                </div>
              </div>

              <div class="live-badge">
                <span></span>
                Live Digital Menu
              </div>
            </header>

            <section class="intro">
              <p class="eyebrow">
                ${safeQrName}
              </p>

              <h1>
                Scan the
                <span> menu.</span>
                <br />
                Find your favorite.
              </h1>

              <p class="intro-description">
                Browse our latest burgers,
                chicken, desserts, drinks,
                prices and availability directly
                from your phone.
              </p>
            </section>

            <section class="menu-card">
              <div class="menu-side">
                <span>Menu</span>
              </div>

              <div class="qr-area">
                <div class="qr-header">
                  <div>
                    <p>Maya Burger</p>

                    <strong>
                      Digital Menu
                    </strong>
                  </div>

                  <img
                    src="${logoUrl}"
                    alt=""
                  />
                </div>

                <div class="qr-frame">
                  <img
                    src="${qrImage}"
                    alt="Maya Burger menu QR code"
                  />
                </div>

                <div class="scan-footer">
                  <div>
                    <p>
                      Point your camera here
                    </p>

                    <strong>
                      Scan the code
                    </strong>
                  </div>

                  <div class="arrow">
                    ↗
                  </div>
                </div>
              </div>

              <div class="instructions">
                <div>
                  <p class="instructions-label">
                    How it works
                  </p>

                  <h2>
                    Scan.
                    <br />
                    Choose.
                    <br />
                    <span>Enjoy.</span>
                  </h2>

                  <p class="instructions-description">
                    Your full Maya Burger menu
                    is only one scan away.
                  </p>

                  <div class="steps">
                    <div class="step">
                      <span>1</span>
                      Open your camera
                    </div>

                    <div class="step">
                      <span>2</span>
                      Scan the QR code
                    </div>

                    <div class="step">
                      <span>3</span>
                      Browse the menu
                    </div>
                  </div>
                </div>

                <div class="no-app">
                  <span></span>
                  No app required
                </div>
              </div>
            </section>

            <section class="products">
              <div class="yellow-background"></div>

              <div class="product-heading">
                <p>Made for cravings</p>

                <h2>
                  Big burgers
                  <span>
                    Cold Oreo shakes
                  </span>
                </h2>
              </div>

              <div class="burger-product">
                ${burgerMarkup}
              </div>

              <div class="burger-tag">
                <strong>
                  ${burgerName}
                </strong>

                <span>
                  ${burgerPrice}
                </span>
              </div>

              <div class="shake-product">
                <div class="shake-photo-shell">
                  <img
                    src="${shakeImageUrl}"
                    alt="${shakeName}"
                    class="shake-photo"
                  />
                </div>
              </div>

              <div class="shake-tag">
                <strong>
                  ${shakeName}
                </strong>

                <span>
                  ${shakePrice}
                </span>
              </div>
            </section>

            <footer class="footer">
              <p class="footer-url">
                ${safeMenuUrl}
              </p>

              <p class="footer-tagline">
                Fresh food.
                <span>Bold flavor.</span>
              </p>
            </footer>
          </main>

          <script>
            window.addEventListener(
              "load",
              function () {
                const images =
                  Array.from(document.images);

                const promises =
                  images.map(function (image) {
                    if (image.complete) {
                      return Promise.resolve();
                    }

                    return new Promise(
                      function (resolve) {
                        image.addEventListener(
                          "load",
                          resolve,
                          { once: true }
                        );

                        image.addEventListener(
                          "error",
                          resolve,
                          { once: true }
                        );
                      }
                    );
                  });

                Promise.all(promises).then(
                  function () {
                    window.setTimeout(
                      function () {
                        window.focus();
                        window.print();
                      },
                      400
                    );
                  }
                );
              }
            );
          </script>
        </body>
      </html>
    `);

    printWindow.document.close();
  }

  function handleReset() {
    setQrName("Main Dining Menu");
    setIncludeLogo(true);
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.label}
              className="rounded-2xl border border-zinc-200/80 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-900"
            >
              <div className="flex items-center gap-4">
                <div
                  className={`flex size-11 shrink-0 items-center justify-center rounded-2xl ${stat.className}`}
                >
                  <Icon size={20} />
                </div>

                <div className="min-w-0">
                  <p className="truncate text-xs font-medium text-zinc-500 dark:text-zinc-400">
                    {stat.label}
                  </p>

                  <p className="mt-0.5 truncate text-xl font-bold text-zinc-950 dark:text-white">
                    {stat.value}
                  </p>

                  <p className="truncate text-[11px] text-zinc-400 dark:text-zinc-500">
                    {stat.helper}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1.25fr)_minmax(360px,0.75fr)]">
        <section className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
          <div className="flex flex-col gap-3 border-b border-zinc-200 px-5 py-4 sm:flex-row sm:items-center sm:justify-between dark:border-zinc-800">
            <div>
              <h2 className="font-semibold text-zinc-950 dark:text-white">
                Customer Scan Preview
              </h2>

              <p className="mt-1 text-xs text-zinc-500">
                Preview the QR code and mobile
                menu experience.
              </p>
            </div>

            <div className="flex w-fit items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700 dark:border-emerald-500/20 dark:bg-emerald-500/10 dark:text-emerald-400">
              <span className="size-1.5 rounded-full bg-emerald-500" />
              Active
            </div>
          </div>

          <div className="p-3 sm:p-5 lg:p-6">
            <div className="hidden" aria-hidden="true">
              <QRCodeCanvas
                ref={qrCanvasRef}
                value={menuUrl}
                size={720}
                level="H"
                marginSize={2}
                bgColor="#ffffff"
                fgColor="#050505"
                title={qrName}
                imageSettings={
                  includeLogo
                    ? {
                        src: "/images/maya_logo.png",
                        width: 120,
                        height: 120,
                        excavate: true,
                      }
                    : undefined
                }
              />
            </div>

            <div className="mx-auto w-full max-w-[820px]">
              <div className="grid grid-cols-[minmax(0,58fr)_minmax(0,42fr)] items-start gap-[clamp(6px,1.6vw,18px)]">
                <div className="min-w-0 pt-[4%]">
                  <div
                    className="mx-auto w-full rounded-[clamp(12px,2vw,22px)] border border-zinc-200 bg-zinc-100 p-[clamp(5px,1.2vw,13px)] dark:border-zinc-800 dark:bg-zinc-950"
                    style={{
                      maxWidth: `${QR_PREVIEW_MAX_SIZE}px`,
                    }}
                  >
                    <div className="rounded-[clamp(10px,1.7vw,18px)] border border-zinc-200 bg-white p-[clamp(6px,1.25vw,14px)] shadow-[0_14px_45px_rgba(0,0,0,0.08)] dark:border-zinc-800">
                      <div className="relative aspect-square w-full overflow-hidden rounded-[clamp(6px,1vw,10px)] bg-white">
                        <Image
                          src="/images/maya-burger-menu-qr.png"
                          alt="Maya Burger QR code preview"
                          fill
                          priority
                          sizes="(max-width: 640px) 46vw, 320px"
                          className="object-contain"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="mt-[clamp(8px,1.5vw,14px)] grid grid-cols-3 gap-[clamp(3px,0.8vw,8px)]">
                    <button
                      type="button"
                      onClick={handleDownload}
                      className="inline-flex h-[clamp(30px,4.8vw,44px)] min-w-0 items-center justify-center gap-[clamp(2px,0.5vw,6px)] rounded-[clamp(7px,1.3vw,12px)] border border-zinc-200 bg-white px-1 text-[clamp(6px,1vw,11px)] font-semibold text-zinc-700 transition hover:border-zinc-300 hover:bg-zinc-50 sm:px-2 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-200 dark:hover:border-zinc-700 dark:hover:bg-zinc-900"
                    >
                      <Download className="size-[clamp(10px,1.6vw,15px)] shrink-0" />
                      <span className="truncate">
                        Download
                      </span>
                    </button>

                    <button
                      type="button"
                      onClick={handlePrint}
                      className="inline-flex h-[clamp(30px,4.8vw,44px)] min-w-0 items-center justify-center gap-[clamp(2px,0.5vw,6px)] rounded-[clamp(7px,1.3vw,12px)] border border-zinc-200 bg-white px-1 text-[clamp(6px,1vw,11px)] font-semibold text-zinc-700 transition hover:border-zinc-300 hover:bg-zinc-50 sm:px-2 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-200 dark:hover:border-zinc-700 dark:hover:bg-zinc-900"
                    >
                      <Printer className="size-[clamp(10px,1.6vw,15px)] shrink-0" />
                      <span className="truncate">
                        Print
                      </span>
                    </button>

                    <button
                      type="button"
                      onClick={handleCopyLink}
                      className="inline-flex h-[clamp(30px,4.8vw,44px)] min-w-0 items-center justify-center gap-[clamp(2px,0.5vw,6px)] rounded-[clamp(7px,1.3vw,12px)] border border-zinc-200 bg-white px-1 text-[clamp(6px,1vw,11px)] font-semibold text-zinc-700 transition hover:border-zinc-300 hover:bg-zinc-50 sm:px-2 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-200 dark:hover:border-zinc-700 dark:hover:bg-zinc-900"
                    >
                      {copied ? (
                        <Check className="size-[clamp(10px,1.6vw,15px)] shrink-0 text-emerald-500" />
                      ) : (
                        <Copy className="size-[clamp(10px,1.6vw,15px)] shrink-0" />
                      )}

                      <span className="truncate">
                        {copied
                          ? "Copied"
                          : "Copy link"}
                      </span>
                    </button>
                  </div>

                  <div className="mt-[clamp(10px,1.8vw,18px)]">
                    <label
                      htmlFor="preview-destination"
                      className="text-[clamp(6px,1vw,11px)] font-semibold uppercase tracking-[0.12em] text-zinc-500 dark:text-zinc-400"
                    >
                      Destination URL
                    </label>

                    <div className="mt-2 flex overflow-hidden rounded-[clamp(8px,1.4vw,12px)] border border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950">
                      <div className="flex size-[clamp(30px,4.8vw,44px)] shrink-0 items-center justify-center border-r border-zinc-200 text-zinc-400 dark:border-zinc-800">
                        <Link2 className="size-[clamp(10px,1.7vw,16px)]" />
                      </div>

                      <input
                        id="preview-destination"
                        readOnly
                        value={menuUrl}
                        className="min-w-0 flex-1 bg-transparent px-2 text-[clamp(6px,1.05vw,12px)] text-zinc-700 outline-none sm:px-3 dark:text-zinc-300"
                      />

                      <button
                        type="button"
                        onClick={handleCopyLink}
                        aria-label="Copy menu URL"
                        className="flex size-[clamp(30px,4.8vw,44px)] shrink-0 items-center justify-center border-l border-zinc-200 text-zinc-400 transition hover:bg-zinc-100 hover:text-zinc-900 dark:border-zinc-800 dark:hover:bg-zinc-900 dark:hover:text-white"
                      >
                        {copied ? (
                          <Check className="size-[clamp(10px,1.7vw,16px)] text-emerald-500" />
                        ) : (
                          <Copy className="size-[clamp(10px,1.7vw,16px)]" />
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="mt-[clamp(9px,1.5vw,14px)] flex items-start gap-[clamp(4px,0.8vw,8px)] rounded-[clamp(8px,1.4vw,12px)] border border-amber-200 bg-amber-50/80 p-[clamp(6px,1.2vw,12px)] dark:border-amber-400/20 dark:bg-amber-400/5">
                    <QrCode className="mt-0.5 size-[clamp(10px,1.7vw,17px)] shrink-0 text-amber-600 dark:text-amber-400" />

                    <p className="text-[clamp(6px,1.05vw,12px)] leading-[1.55] text-zinc-600 dark:text-zinc-400">
                      This QR stays the same when
                      you update prices, images or
                      menu availability.
                    </p>
                  </div>
                </div>

                <div className="relative z-20 min-w-0">
                  <PhonePreview
                    items={previewItems}
                    loading={loading}
                  />

                  <p className="mt-[clamp(4px,0.8vw,8px)] text-center text-[clamp(6px,1vw,11px)] font-medium text-zinc-500">
                    Tap the phone to enlarge
                  </p>

                  <a
                    href={IPHONE_FRAME_SOURCE}
                    target="_blank"
                    rel="noreferrer"
                    className="mx-auto mt-1 block w-fit text-center text-[clamp(5px,0.8vw,9px)] text-zinc-400 transition hover:text-zinc-600 dark:text-zinc-600 dark:hover:text-zinc-400"
                  >
                    iPhone frame: Wikimedia Commons
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <aside className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
          <div className="border-b border-zinc-200 px-5 py-4 dark:border-zinc-800">
            <h2 className="font-semibold text-zinc-950 dark:text-white">
              QR Settings
            </h2>

            <p className="mt-1 text-xs text-zinc-500">
              Changes update the QR preview
              immediately.
            </p>
          </div>

          <div className="space-y-5 p-5">
            <div>
              <label
                htmlFor="qr-name"
                className="text-xs font-semibold text-zinc-600 dark:text-zinc-400"
              >
                QR Name
              </label>

              <input
                id="qr-name"
                value={qrName}
                maxLength={60}
                onChange={(event) =>
                  setQrName(
                    event.target.value
                  )
                }
                className="mt-2 h-11 w-full rounded-xl border border-zinc-200 bg-zinc-50 px-3 text-sm text-zinc-900 outline-none transition focus:border-amber-400 focus:ring-4 focus:ring-amber-400/10 dark:border-zinc-800 dark:bg-zinc-950 dark:text-white"
              />
            </div>

            <div>
              <label
                htmlFor="qr-destination"
                className="text-xs font-semibold text-zinc-600 dark:text-zinc-400"
              >
                Destination
              </label>

              <div className="mt-2 flex overflow-hidden rounded-xl border border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950">
                <div className="flex size-11 shrink-0 items-center justify-center border-r border-zinc-200 text-zinc-400 dark:border-zinc-800">
                  <Link2 size={17} />
                </div>

                <input
                  id="qr-destination"
                  readOnly
                  value={menuUrl}
                  className="min-w-0 flex-1 bg-transparent px-3 text-sm text-zinc-700 outline-none dark:text-zinc-300"
                />

                <button
                  type="button"
                  onClick={handleCopyLink}
                  aria-label="Copy menu URL"
                  className="flex size-11 shrink-0 items-center justify-center border-l border-zinc-200 text-zinc-400 transition hover:bg-zinc-100 hover:text-zinc-800 dark:border-zinc-800 dark:hover:bg-zinc-800 dark:hover:text-white"
                >
                  {copied ? (
                    <Check
                      size={17}
                      className="text-emerald-500"
                    />
                  ) : (
                    <Copy size={17} />
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between border-y border-zinc-200 py-4 dark:border-zinc-800">
              <div className="pr-4">
                <p className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">
                  Include Maya logo
                </p>

                <p className="mt-1 text-xs leading-5 text-zinc-500">
                  Display the logo inside the
                  QR code.
                </p>
              </div>

              <button
                type="button"
                role="switch"
                aria-checked={includeLogo}
                onClick={() =>
                  setIncludeLogo(
                    (current) => !current
                  )
                }
                className={`relative h-6 w-11 shrink-0 rounded-full transition ${
                  includeLogo
                    ? "bg-amber-400"
                    : "bg-zinc-300 dark:bg-zinc-700"
                }`}
              >
                <span
                  className={`absolute top-1 size-4 rounded-full bg-white shadow-sm transition-transform ${
                    includeLogo
                      ? "translate-x-6"
                      : "translate-x-1"
                  }`}
                />
              </button>
            </div>

            <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-950">
              <div className="flex items-start gap-3">
                <ImageIcon
                  size={18}
                  className="mt-0.5 shrink-0 text-amber-500"
                />

                <div>
                  <p className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">
                    A4 print poster
                  </p>

                  <p className="mt-1 text-xs leading-5 text-zinc-500">
                    Designed for restaurant
                    tables, counters, walls and
                    acrylic stands.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={handleReset}
                className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-zinc-200 bg-white px-4 text-sm font-semibold text-zinc-700 transition hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-200 dark:hover:bg-zinc-800"
              >
                <RotateCcw size={16} />
                Reset
              </button>

              <Link
                href={menuUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-amber-400 px-4 text-sm font-bold text-zinc-950 transition hover:bg-amber-300"
              >
                Preview
                <ExternalLink size={16} />
              </Link>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

function PhonePreview({
  items,
  loading,
}: {
  items: Burger[];
  loading: boolean;
}) {
  const [isExpanded, setIsExpanded] =
    useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setIsExpanded(true)}
        aria-label="Enlarge customer mobile preview"
        className="group relative block w-full cursor-zoom-in rounded-[12%] text-left outline-none focus-visible:ring-4 focus-visible:ring-amber-400/40"
      >
        <PhoneDevice
          items={items}
          loading={loading}
          expanded={false}
        />

        <span className="absolute bottom-[5%] right-[8%] z-40 flex size-[clamp(22px,4vw,34px)] items-center justify-center rounded-full border border-white/15 bg-black/75 text-white opacity-100 shadow-lg backdrop-blur-md transition group-hover:scale-105 sm:opacity-0 sm:group-hover:opacity-100">
          <Maximize2 className="size-[48%]" />
        </span>
      </button>

      {isExpanded &&
      typeof document !== "undefined"
        ? createPortal(
            <div
          role="dialog"
          aria-modal="true"
          aria-label="Expanded customer mobile preview"
          onClick={() => setIsExpanded(false)}
          className="fixed inset-0 z-[200] flex items-center justify-center bg-black/85 p-3 backdrop-blur-md"
        >
          <button
            type="button"
            onClick={() => setIsExpanded(false)}
            aria-label="Close expanded preview"
            className="absolute right-4 top-4 z-[220] flex size-11 items-center justify-center rounded-full border border-white/15 bg-zinc-950/90 text-white shadow-xl transition hover:bg-zinc-800"
          >
            <X size={20} />
          </button>

          <div
            onClick={(event) =>
              event.stopPropagation()
            }
            className="relative"
            style={{
              width:
                "min(90vw, calc(91vh * 356 / 730), 410px)",
            }}
          >
            <PhoneDevice
              items={items}
              loading={loading}
              expanded
            />
          </div>
        </div>,
            document.body
          )
        : null}
    </>
  );
}

function PhoneDevice({
  items,
  loading,
  expanded,
}: {
  items: Burger[];
  loading: boolean;
  expanded: boolean;
}) {
  return (
    <div className="relative aspect-[356/730] w-full [container-type:inline-size] drop-shadow-[0_8cqw_12cqw_rgba(0,0,0,0.34)] dark:drop-shadow-[0_8cqw_13cqw_rgba(0,0,0,0.76)]">
      <img
        src={IPHONE_FRAME_URL}
        alt="iPhone 15 Pro frame"
        className="pointer-events-none absolute inset-0 z-0 h-full w-full select-none object-contain"
      />

      <div className="absolute inset-x-[4.8%] bottom-[2.35%] top-[8.55%] z-10 overflow-hidden rounded-b-[12%] bg-black">
        <div
          className={`h-full bg-black [scrollbar-width:none] [&::-webkit-scrollbar]:hidden ${
            expanded
              ? "overflow-y-auto overscroll-contain"
              : "overflow-hidden"
          }`}
        >
          <section className="relative overflow-hidden px-[4.5cqw] pb-[4.5cqw] pt-[5.5cqw] text-center">
            <div className="pointer-events-none absolute right-[3.5cqw] top-[1cqw] text-[7.5cqw] leading-none">
              🍔
            </div>

            <div className="flex items-center justify-center gap-[2.2cqw] text-amber-400">
              <span className="h-px w-[9cqw] bg-gradient-to-r from-transparent to-amber-400" />

              <p className="font-serif text-[3.1cqw] font-semibold italic tracking-wide">
                Always Made Fresh
              </p>

              <span className="h-px w-[9cqw] bg-gradient-to-l from-transparent to-amber-400" />
            </div>

            <h3 className="mt-[2.3cqw] text-[9.8cqw] font-black uppercase leading-none tracking-[-0.045em] text-white">
              Our Menu
            </h3>

            <p className="mx-auto mt-[4.2cqw] max-w-[67cqw] text-[2.8cqw] leading-[1.55] text-zinc-400">
              Fresh burgers, crispy sides and
              bold flavors prepared with
              quality ingredients.
            </p>

            <div className="mx-auto mt-[4cqw] h-px w-[18cqw] bg-gradient-to-r from-transparent via-amber-400/80 to-transparent" />

            <div className="relative mx-auto mt-[4cqw] h-[49cqw] w-full overflow-hidden">
              <div className="absolute left-1/2 top-1/2 h-[26cqw] w-[58cqw] -translate-x-1/2 -translate-y-1/2 -rotate-6 bg-amber-400/90 [clip-path:polygon(0_39%,10%_31%,6%_18%,24%_26%,28%_10%,42%_22%,56%_8%,64%_25%,86%_14%,82%_32%,100%_39%,88%_54%,96%_67%,75%_64%,72%_83%,54%_72%,40%_90%,35%_70%,16%_81%,19%_61%,0_57%)]" />

              <div className="absolute inset-x-[7cqw] bottom-[1cqw] top-[1cqw] bg-[radial-gradient(circle_at_center,rgba(255,196,0,0.18),transparent_66%)]" />

              <Image
                src="/images/hero-burger.png"
                alt="Maya Burger meal with burger, fries and drink"
                fill
                priority
                sizes="(max-width: 640px) 280px, 360px"
                className="relative z-10 object-contain object-center drop-shadow-[0_5cqw_4.5cqw_rgba(0,0,0,0.75)]"
              />
            </div>
          </section>

          <section className="mx-[3.4cqw] rounded-[5.3cqw] border border-white/10 bg-[#0d0d0d] p-[2.8cqw]">
            <div className="grid grid-cols-4 gap-[1.7cqw]">
              {[
                "All Items",
                "Burgers",
                "Chicken",
                "Desserts",
              ].map((category) => {
                const active =
                  category === "Burgers";

                return (
                  <div
                    key={category}
                    className={`flex h-[11.2cqw] items-center justify-center rounded-[3.3cqw] px-[0.5cqw] text-center text-[2.15cqw] font-bold ${
                      active
                        ? "bg-amber-400 text-black"
                        : "bg-[#171717] text-zinc-400"
                    }`}
                  >
                    {category}
                  </div>
                );
              })}
            </div>

            <div className="mt-[2.8cqw] flex items-center justify-between border-t border-white/10 pt-[2.8cqw]">
              <p className="text-[2.1cqw] font-black uppercase tracking-[0.14em] text-zinc-600">
                {items.length} items
              </p>

              <div className="flex h-[10cqw] items-center gap-[2cqw] rounded-[3.3cqw] border border-white/10 bg-[#111111] px-[3.2cqw] text-[2.1cqw] font-semibold text-zinc-400">
                Featured first
                <span className="text-[3.4cqw] leading-none text-amber-400">
                  ⌄
                </span>
              </div>
            </div>
          </section>

          <section className="space-y-[3.4cqw] px-[3.4cqw] pb-[8cqw] pt-[3.4cqw]">
            {loading ? (
              <>
                <PhoneSkeleton />
                <PhoneSkeleton />
              </>
            ) : items.length > 0 ? (
              items.map((item, index) => (
                <article
                  key={item.id}
                  className="overflow-hidden rounded-[5.6cqw] border border-white/10 bg-[#0d0d0d]"
                >
                  <div className="relative h-[53cqw] overflow-hidden bg-[#101415]">
                    {item.imageUrl ? (
                      <Image
                        src={item.imageUrl}
                        alt={item.name}
                        fill
                        sizes="(max-width: 640px) 280px, 360px"
                        className="object-cover object-center"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center bg-[radial-gradient(circle_at_center,rgba(255,196,0,0.12),transparent_65%)]">
                        <UtensilsCrossed className="size-[9.5cqw] text-zinc-700" />
                      </div>
                    )}

                    <div className="absolute inset-0 bg-gradient-to-b from-black/5 via-transparent to-[#0d0d0d]" />

                    <div className="absolute left-[3.4cqw] top-[3.4cqw] rounded-full border border-white/10 bg-black/70 px-[3.3cqw] py-[1.7cqw] text-[2.1cqw] font-black uppercase tracking-[0.16em] text-zinc-300 backdrop-blur-md">
                      {item.category || "Menu"}
                    </div>

                    <div className="absolute right-[3.4cqw] top-[3.4cqw] flex items-center gap-[1.7cqw] rounded-full border border-emerald-400/30 bg-emerald-500/10 px-[3.3cqw] py-[1.7cqw] text-[2.1cqw] font-black uppercase tracking-[0.12em] text-emerald-300 backdrop-blur-md">
                      <span className="size-[1.7cqw] rounded-full bg-emerald-400 shadow-[0_0_2.2cqw_rgba(52,211,153,0.95)]" />
                      Available
                    </div>
                  </div>

                  <div className="p-[4.5cqw]">
                    <div className="flex items-start justify-between gap-[3cqw]">
                      <h4 className="min-w-0 flex-1 text-[5.1cqw] font-black uppercase leading-none tracking-[-0.025em] text-white">
                        {item.name}
                      </h4>

                      {index === 0 ? (
                        <span className="shrink-0 border-b border-amber-400 pb-[1cqw] text-[2.1cqw] font-black uppercase tracking-[0.18em] text-amber-400">
                          Popular
                        </span>
                      ) : null}
                    </div>

                    <p className="mt-[3.4cqw] line-clamp-3 text-[2.8cqw] leading-[1.65] text-zinc-400">
                      {item.description ||
                        `${item.category} prepared fresh with bold Maya Burger flavor.`}
                    </p>

                    <p className="mt-[5.5cqw] text-[6.5cqw] font-black uppercase leading-none tracking-[-0.03em] text-amber-400">
                      {formatPrice(item.price)} Birr
                    </p>
                  </div>
                </article>
              ))
            ) : (
              <div className="rounded-[5.6cqw] border border-dashed border-white/10 bg-[#0d0d0d] px-[4.5cqw] py-[11cqw] text-center">
                <p className="text-[2.8cqw] leading-[1.7] text-zinc-500">
                  No available menu items.
                </p>
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}

function PhoneSkeleton() {
  return (
    <div className="animate-pulse overflow-hidden rounded-[5.6cqw] border border-white/10 bg-[#0d0d0d]">
      <div className="h-[53cqw] bg-zinc-900" />

      <div className="space-y-[3cqw] p-[4.5cqw]">
        <div className="h-[4cqw] w-2/3 rounded bg-zinc-800" />
        <div className="h-[2.5cqw] w-full rounded bg-zinc-800" />
        <div className="h-[2.5cqw] w-5/6 rounded bg-zinc-800" />
        <div className="h-[6cqw] w-1/3 rounded bg-zinc-800" />
      </div>
    </div>
  );
}