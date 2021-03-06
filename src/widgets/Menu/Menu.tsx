import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import throttle from "lodash/throttle";

import Overlay from "../../components/Overlay/Overlay";
import Flex from "../../components/Box/Flex";
import { useMatchBreakpoints } from "../../hooks";
import Logo from "./components/Logo";
import Panel from "./components/Panel"; 
import UserBlock from "./components/UserBlock";
import ContentNav from "./components/ContentNav";
import { NavProps } from "./types";
import Avatar from "./components/Avatar";
import { MENU_HEIGHT, SIDEBAR_WIDTH_REDUCED, SIDEBAR_WIDTH_FULL } from "./config";
// import Guide from "./components/Guide";
// import LangSelector from "./components/LangSelector";
// import IconSetting from "../../assets/images/setting.svg";

const Wrapper = styled.div`
  position: relative;
  width: 100%;
`;

const StyledNav = styled.nav<{ showMenu: boolean }>`
  position: fixed;
  top: ${({ showMenu }) => (showMenu ? 0 : `-${MENU_HEIGHT}px`)};
  left: 0;
  transition: top 0.2s;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 8px;
  padding-right: 16px;
  width: 100%;
  height: ${MENU_HEIGHT}px;
  background-color: ${({ theme }) => theme.nav.background};
  border-bottom: solid 2px rgba(133, 133, 133, 0.1);
  z-index: 20;
  transform: translate3d(0, 0, 0);
  box-shadow: 0 0px 13px #e9e9e9;
`;

const BodyWrapper = styled.div`
  position: relative;
  display: flex;
`;

// const Inner = styled.div<{ isMobile: boolean; isPushed: boolean; showMenu: boolean }>`
//   flex-grow: 1;
//   // margin-top: ${({ showMenu }) => (showMenu ? `${MENU_HEIGHT}px` : 0)};
//   margin-top: 64px;
//   transition: margin-top 0.2s;
//   transform: translate3d(0, 0, 0);
//   max-width: 100%;

//   ${({ theme }) => theme.mediaQueries.nav} {
//     margin-left: ${({ isMobile, isPushed }) => `${isMobile && isPushed ? SIDEBAR_WIDTH_FULL : SIDEBAR_WIDTH_REDUCED}px`};
//     max-width: ${({ isMobile, isPushed }) =>`calc(100% - ${isMobile && isPushed ? SIDEBAR_WIDTH_FULL : SIDEBAR_WIDTH_REDUCED}px)`};
//   }
// `;
const Inner = styled.div<{ isPushed: boolean; showMenu: boolean }>`
  flex-grow: 1;
  margin-top: ${({ showMenu }) => (showMenu ? `${MENU_HEIGHT}px` : 0)};
  transition: margin-top 0.2s, margin-left 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  transform: translate3d(0, 0, 0);
  max-width: 100%;

  ${({ theme }) => theme.mediaQueries.nav} {
    margin-left: ${({ isPushed }) => `${isPushed ? SIDEBAR_WIDTH_FULL : SIDEBAR_WIDTH_REDUCED}px`};
    max-width: ${({ isPushed }) => `calc(100% - ${isPushed ? SIDEBAR_WIDTH_FULL : SIDEBAR_WIDTH_REDUCED}px)`};
  }
`;

const MobileOnlyOverlay = styled(Overlay)`
  position: fixed;
  height: 100%;

  ${({ theme }) => theme.mediaQueries.nav} {
    display: none;
  }
`;

// const BoxBSC = styled.div<{ type: string }>`
//   padding: 5px 10px;
//   margin-left: 10px;
//   margin-right: 10px;
//   border-radius: 5px;
//   display: flex;
//   text-align: center;
//   align-items: center;
//   justify-content: center;
//   font-weight: bold;

//   color: #954306;
//   background: rgba(197, 131, 95, 0.5);
// `

const Menu: React.FC<NavProps> = ({
  account,
  login,
  logout,
  isDark,
  toggleTheme,
  langs,
  setLang,
  currentLang,
  cakePriceUsd,
  links,
  profile,
  children,
}) => {
  const { isXl } = useMatchBreakpoints();
  const isMobile = isXl === false;
  // const [isPushed, setIsPushed] = useState(!isMobile); // auto open on desktop but collapse on mobile
  const [isPushed, setIsPushed] = useState(false); // auto close all
  const [showMenu, setShowMenu] = useState(true);
  const refPrevOffset = useRef(window.pageYOffset);

  useEffect(() => {
    const handleScroll = () => {
      const currentOffset = window.pageYOffset;
      const isBottomOfPage = window.document.body.clientHeight === currentOffset + window.innerHeight;
      const isTopOfPage = currentOffset === 0;
      // Always show the menu when user reach the top
      if (isTopOfPage) {
        setShowMenu(true);
      }
      // Avoid triggering anything at the bottom because of layout shift
      else if (!isBottomOfPage) {
        if (currentOffset < refPrevOffset.current) {
          // Has scroll up
          setShowMenu(true);
        } else {
          // Has scroll down
          setShowMenu(false);
        }
      }
      refPrevOffset.current = currentOffset;
    };
    const throttledHandleScroll = throttle(handleScroll, 200);

    window.addEventListener("scroll", throttledHandleScroll);
    return () => {
      window.removeEventListener("scroll", throttledHandleScroll);
    };
  }, []);

  // Find the home link if provided
  const homeLink = links.find((link) => link.label === "Home");

  return (
    <Wrapper>
      {/* Header top */}
      <StyledNav showMenu={showMenu}>
        <Logo
          isMobile={isMobile}
          isPushed={isPushed}
          togglePush={() => setIsPushed((prevState: boolean) => !prevState)}
          isDark={isDark}
          href={homeLink?.href ?? "/"}
        />
        {!isMobile && (
          <>
            <ContentNav
              isPushed={isPushed}
              isMobile={isMobile}
              isDark={isDark}
              toggleTheme={toggleTheme}
              langs={langs}
              setLang={setLang}
              currentLang={currentLang}
              cakePriceUsd={cakePriceUsd}
              pushNav={setIsPushed}
              links={links}
            />
            {/* <StyledDivBoxLan>
              <Guide />
              <LangSelector position="bottom" currentLang={currentLang} langs={langs} setLang={setLang} />
            </StyledDivBoxLan> */}
          </>
        )}
        <Flex>
          {/* <BoxBSC type="1">
            BSC
          </BoxBSC> */}
          <UserBlock account={account} login={login} logout={logout} />
          {profile && <Avatar profile={profile} />}
          {/* <BoxBSC type="2">
            <img src={IconSetting} width={20}  alt="setting"/>
          </BoxBSC> */}
        </Flex>
      </StyledNav>
      {/* Sidebar and content */}
      <BodyWrapper>
        {/* Sidebar */}
        {isMobile && (
          <Panel
            isPushed={isPushed}
            isMobile={isMobile}
            showMenu={showMenu}
            isDark={isDark}
            toggleTheme={toggleTheme}
            langs={langs}
            setLang={setLang}
            currentLang={currentLang}
            cakePriceUsd={cakePriceUsd}
            pushNav={setIsPushed}
            links={links}
          />
        )}

        {/* Content */}
        <Inner isPushed={isPushed} showMenu={showMenu}>
          {children}
        </Inner>
        <MobileOnlyOverlay show={isPushed} onClick={() => setIsPushed(false)} role="presentation" />
      </BodyWrapper>
    </Wrapper>
  );
};

export default Menu;
