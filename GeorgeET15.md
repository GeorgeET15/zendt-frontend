# Zendt Frontend - Change Log

This document outlines the comprehensive changes made to the Zendt Frontend application to enhance functionality, user experience, and visual design.

## 1. Authentication & Security
- **Persistence:** Implemented `AuthContext` with `localStorage` to persist login state across refreshes.
- **Route Protection:** Added `RequireAuth` component in `App.tsx` to protect dashboard routes and redirect unauthenticated users.
- **Login Logic:** 
  - Updated `Login.tsx` to auto-redirect authenticated users to the dashboard.
  - Added a "Biometric Login" option (UI only) with a "Coming Soon" toast notification.
  - Integrated `Toast` component for feedback.

## 2. Dashboard Home (Wallet Carousel)
- **Custom Carousel:** Replaced external Swiper library with a custom native scrolling implementation in `Summary.tsx`.
- **UX Improvements:**
  - Fixed scrolling behavior to stop precisely at the "Add Wallet" card.
  - Added proper spacing (`gap-4`) between cards.
  - Implemented "snap" scrolling for a native app feel.
  - Hidden scrollbars for a cleaner look.
  - Added currency symbols ($, €, ₹, etc.) to wallet cards.
  - Adjusted card dimensions and text sizes for better readability.
- **UI Refinements:**
  - Updated global background color to `#141414`.
  - Updated card background color to `#161616`.
  - Refactored wallet carousel to display 3 cards per frame.
  - Increased wallet card height (aspect ratio 130/175) for better visual proportion.
  - Adjusted flag image size and position for better visibility.
  - Changed "Add Wallet" to "Add Account".
  - Removed currency suffix from wallet amounts.

## 3. Financial Tools

### Virtual Account (`VirtualAccountPage.tsx`)
- **Layout Fixes:** Increased bottom padding to ensure content scrolls above the bottom navigation bar.
- **Dropdowns:** Fixed z-index issues to ensure dropdowns appear above other content.
- **Interactivity:** Implemented functional "Copy" and "Share" buttons with Toast feedback.

### Card Management (`CardManagementPage.tsx`)
- **Dynamic Data:** Linked transaction history to the currently selected card in the carousel.
- **State Management:** Added state to track the active slide index.

### Payment Links
- **Payment Links List (`PaymentLinksPage.tsx`):**
  - Added comprehensive filtering options (Status, Duration).
  - Added sorting functionality (Newest, Oldest, Amount).
  - Implemented search inputs for ID, Reference, and Customer details.
  - Connected to `dataService` for data fetching.
- **Create Payment Link (`PaymentLinkCreatePage.tsx`):**
  - Enhanced form layout and inputs.
  - Added "Success" state with a copyable share link.
  - Integrated Toast notification for "Link Copied".

### Invoicing (`InvoicePage.tsx`)
- **Functionality:** Added "Copy Total" button with Toast feedback.
- **UI/UX:** Improved form field styling and layout.
- **Logic:** Implemented dynamic calculation for service line items (Rate × Quantity).

### Bank Accounts
- **New Page:** Created `BankAccountsPage.tsx` to display connected bank details.
- **Navigation:** Linked from the Profile Hub to prevent 404/redirect errors.

## 4. User Management & Settings

### Profile (`ProfileHub.tsx`)
- **Navigation:** Updated links and icons.
- **Logout:** Converted logout to a button that clears auth state and redirects to login.

### Add Client (`AddClientPage.tsx`)
- **Form:** Created a comprehensive form for adding individuals or companies.
- **Feedback:** Added success state and Toast notification upon saving.

### Help & Support (`HelpPage.tsx`)
- **FAQ:** Implemented an accordion-style FAQ section for better information density.

## 5. Global Components & UI
- **Toast Component:** Created a reusable `Toast.tsx` component for consistent system notifications (Success, Info, etc.).
- **Styling:** Applied consistent glassmorphism and dark mode styling across new and updated pages.
- **Routing:** Updated `App.tsx` to include new routes (`/dashboard/bank-accounts`).

## 6. Data Service
- **Mock Data:** Updated `fake-data.json` and `dataService.ts` to support new features like Payment Links and Pricing Plans.

## 7. Wallet Actions & Navigation
- **Wallet Action Modal:**
  - Added a modal with "Move", "Transfer", and "Redeem" options.
  - Triggered by clicking on any wallet card.
  - Styled with a dark theme and backdrop blur.
- **Bottom Navigation:**
  - Refactored mobile navigation with a custom floating design.
  - Dimensions: `374px` width, `59px` height, `66px` border-radius.
  - Background: `#1F1F1F` (opaque) to hide scrolling content.
  - Icons: Replaced PNGs with custom SVG components (`NavIcons.tsx`) for sharper visuals.
