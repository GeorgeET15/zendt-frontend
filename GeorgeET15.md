# Zendt Frontend - Change Log

**Forked from:** [princysivakumar/zendt-frontend](https://github.com/princysivakumar/zendt-frontend)  
**Changes made by:** GeorgeET15 ([georgeemmanuelthomas.dev](https://georgeemmanuelthomas.dev))  
**Context:** These changes were made during my internship at Zendit from Dec 3, 2025, for 2 weeks.

This document outlines the comprehensive changes I made to the Zendt Frontend application to enhance functionality, user experience, and visual design.

## 1. Authentication & Security
- **Persistence:** I implemented `AuthContext` with `localStorage` to persist login state across refreshes.
- **Route Protection:** I added a `RequireAuth` component in `App.tsx` to protect dashboard routes and redirect unauthenticated users.
- **Login Logic:** 
  - I updated `Login.tsx` to auto-redirect authenticated users to the dashboard.
  - I added a "Biometric Login" option (UI only) with a "Coming Soon" toast notification.
  - I integrated the `Toast` component for feedback.

## 2. Dashboard Home (Wallet Carousel)
- **Custom Carousel:** I replaced the external Swiper library with a custom native scrolling implementation in `Summary.tsx`.
- **UX Improvements:**
  - I fixed the scrolling behavior to stop precisely at the "Add Wallet" card.
  - I added proper spacing (`gap-4`) between cards.
  - I implemented "snap" scrolling for a native app feel.
  - I hid the scrollbars for a cleaner look.
  - I added currency symbols ($, €, ₹, etc.) to wallet cards.
  - I adjusted card dimensions and text sizes for better readability.
- **UI Refinements:**
  - I updated the global background color to `#141414`.
  - I updated the card background color to `#161616`.
  - I refactored the wallet carousel to display 3 cards per frame.
  - I increased the wallet card height (aspect ratio 130/175) for better visual proportion.
  - I adjusted the flag image size and position for better visibility.
  - I changed "Add Wallet" to "Add Account".
  - I removed the currency suffix from wallet amounts.

## 3. Financial Tools

### Virtual Account (`VirtualAccountPage.tsx`)
- **Layout Fixes:** I increased the bottom padding to ensure content scrolls above the bottom navigation bar.
- **Dropdowns:** I fixed z-index issues to ensure dropdowns appear above other content.
- **Interactivity:** I implemented functional "Copy" and "Share" buttons with Toast feedback.

### Card Management (`CardManagementPage.tsx`)
- **Dynamic Data:** I linked transaction history to the currently selected card in the carousel.
- **State Management:** I added state to track the active slide index.
- **UI Updates:**
  - I removed user avatars from the transaction list.
  - I enhanced credit card visuals with realism (glassmorphism, noise texture, chip, contactless icon).
  - I darkened the card UI for a better aesthetic.

### Payment Links
- **Payment Links List (`PaymentLinksPage.tsx`):**
  - I added comprehensive filtering options (Status, Duration).
  - I added sorting functionality (Newest, Oldest, Amount).
  - I implemented search inputs for ID, Reference, and Customer details.
  - I connected the page to `dataService` for data fetching.
- **Create Payment Link (`PaymentLinkCreatePage.tsx`):**
  - I enhanced the form layout and inputs.
  - I added a "Success" state with a copyable share link.
  - I integrated Toast notification for "Link Copied".

### Invoicing (`InvoicePage.tsx`)
- **Functionality:** I added a "Copy Total" button with Toast feedback.
- **UI/UX:** I improved form field styling and layout.
- **Logic:** I implemented dynamic calculation for service line items (Rate × Quantity).

### Bank Accounts
- **New Page:** I created `BankAccountsPage.tsx` to display connected bank details.
- **Navigation:** I linked this from the Profile Hub to prevent 404/redirect errors.

### Pricing & Payment Pages
- **Pricing Page (`PricingPage.tsx`):**
  - I implemented a new menu-based UI with 3 options: "When a payment request is paid", "Fees for transfers", and "Other fees".
  - I moved existing pricing plans to the "Other fees" sub-view.
  - I enhanced card visuals with `GradientBlob` and custom arrow SVGs.
- **Payment Pages Options (`PaymentPagesOptions.tsx`):**
  - I created a new screen for "Payment Pages" with "International" and "Domestic" options.
  - I linked both options to the Payment Link creation page.
  - I made this accessible via the Core Features Modal.

## 4. User Management & Settings

### Profile (`ProfileHub.tsx`)
- **Navigation:** I updated links and icons.
- **Logout:** I converted logout to a button that clears auth state and redirects to login.

### Add Client (`AddClientPage.tsx`)
- **Form:** I created a comprehensive form for adding individuals or companies.
- **Feedback:** I added a success state and Toast notification upon saving.

### Help & Support (`HelpPage.tsx`)
- **FAQ:** I implemented an accordion-style FAQ section for better information density.

## 5. Global Components & UI
- **Toast Component:** I created a reusable `Toast.tsx` component for consistent system notifications (Success, Info, etc.).
- **Styling:** I applied consistent glassmorphism and dark mode styling across new and updated pages.
- **Routing:** I updated `App.tsx` to include new routes (`/dashboard/bank-accounts`, `/dashboard/payment-pages`).
- **GradientBlob:** I created a reusable SVG component for background effects and applied it across the app.
- **Explore Page:**
  - I created a new `ExplorePage.tsx` with a 5-container grid layout.
  - I fixed visibility issues with `BarsIcon` and aligned icons with text.
- **Transactions UI:**
  - I refined the "All Transactions" list to match the cleaner dashboard summary style (removed borders/backgrounds).
  - I removed avatars from transaction lists.

## 6. Data Service
- **Mock Data:** I updated `fake-data.json` and `dataService.ts` to support new features like Payment Links and Pricing Plans.

## 7. Wallet Actions & Navigation
- **Wallet Action Modal:**
  - I added a modal with "Move", "Transfer", and "Redeem" options.
  - I set it to trigger by clicking on any wallet card.
  - I styled it with a dark theme and backdrop blur.
- **Bottom Navigation:**
  - I refactored mobile navigation with a custom floating design.
  - Dimensions: `374px` width, `59px` height, `66px` border-radius.
  - Background: `#1F1F1F` (opaque) to hide scrolling content.
  - Icons: I replaced PNGs with custom SVG components (`NavIcons.tsx`) for sharper visuals.
- **Core Features Modal:**
  - I added a central modal for quick actions (Payment Links, Invoices, etc.).
  - I integrated it with the "Virtual" tab in the bottom navigation.

## 8. Recent Refinements & Documentation
- **Documentation:**
  - I completely rewrote `README.md` to adopt a professional tone.
  - I added a "Mobile Development" section with Capacitor commands.
  - I performed a codebase analysis to identify and document unused files in `unused_code.md`.
- **UI Enhancements:**
  - **Login/Auth:**
    - I replaced the static SVG background with the dynamic `GradientBlob` component.
    - I centered the auth pattern image and adjusted its rotation and position for a more balanced look.
  - **Dashboard:**
    - I added a "Swipe" indicator with a pulse animation to the "Available Cards" section to improve discoverability when multiple cards are present.

## 9. Recent Updates (Dec 10, 2025)
- **Splash Screen:**
  - I implemented a new `SplashScreen` component as the initial route.
  - It features a 3-slide carousel using `swiper` with custom animations.
  - I added a "Get Started" button on the final slide to navigate to the login page.
  - I styled it to match the Login UI for a seamless transition.
- **Dashboard Visibility Toggles:**
  - I added a "Dashboard Visibility" section to the `SettingsPage`.
  - I created a `useDashboardSettings` hook to persist visibility preferences for Wallets, Transactions, and Cards using `localStorage`.
  - I updated the Dashboard Summary to conditionally render these sections based on user settings.
- **Bank Accounts Redesign:**
  - I completely redesigned the `BankAccountsPage` to match the Profile Hub UI.
  - I created a new `BankAccountCard` component featuring:
    - A custom "wavy" SVG background on the left side.
    - Left-aligned flag that sits "behind" the waves.
    - Bank logo and details (Name, Currency, Account Number).
  - I added interactive "Active/Inactive" and "Default" toggle buttons with visual state feedback (darker background when selected).
  - I updated `fake-data.json` and `dataService.ts` to support multiple bank accounts with specific logos (`sbi.png`, `axis.png`).

## 10. Recent Updates (Dec 12, 2025)
- **About Page Redesign (`AboutPage.tsx`):**
  - I completely overhauled the UI with a premium glassmorphism aesthetic.
  - I implemented a modern grid layout for feature cards.
  - I enhanced the background with larger, more visible gradient blobs.
  - I updated the typography with larger fonts and a cleaner hierarchy.
  - I set the background color to `#141414` as per specific request.
- **Virtual Account Page Overhaul (`VirtualAccountPage.tsx`):**
  - I redesigned the page to match a specific "premium" reference UI.
  - I added a "Domestic" vs "International" location toggle.
  - I improved the currency selector dropdown.
  - I integrated "Copy" and "Share" functionality directly into the new layout.
  - I updated the data to include Qatar Riyal (QAR) and UAE Dirham (AED).
- **Code Restoration & Fixes:**
  - I restored missing content in `PricingPage.tsx` and `VirtualAccountPage.tsx`.
  - I fixed the "Loading..." screen in `CardManagementPage.tsx` by replacing it with a skeleton loader.
  - I adjusted the `FlappyGame` difficulty (slower speed, wider gaps) for better playability.
  - I increased the graph size in `SpendingDetailsPage.tsx` for better visibility.
  - I fixed a bug in `AddClientPage.tsx` related to the success message.
- **Currency Updates:**
  - I updated `fake-data.json` to replace Euro with Qatar Riyal (QAR) and GBP with UAE Dirham (AED) in wallets and virtual accounts.
