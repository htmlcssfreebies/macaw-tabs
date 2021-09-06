/**
 * Macaw Tabs | Tabs jQuery Plugin
 *
 * @author    https://htmlcssfreebies.com/macaw-tabs/
 * @copyright Copyright (c) 2021  HTMLCSSFreebies.com
 * @license   MIT License, https://opensource.org/licenses/MIT
 * @version   v1.1
 */

( function( $ ) {
	'use strict';

	$.fn.macawTabs = function( options ) {
		// Default Settings
		const defaults = {
			tabPanelAutoActivation: false,
			tabPanelTransitionLogic: true,
			tabPanelTransitionClass: 'active',
			tabPanelTransitionTimeout: 0,
			tabPanelTransitionTimeoutDuration: 50,
			autoVerticalOrientation: true,
			autoVerticalOrientationMaxWidth: '575px',
			onTabActivation() {},
		};

		// Settings
		const settings = $.extend( {}, defaults, options );

		// Loop Elements
		return this.each( function() {
			// Parent Context and Settings
			const parentObj = { parentThis: $( this ), settings };

			// Init
			init( parentObj );

			// Resize Event
			resizeEvent( parentObj );
		} );
	};

	//
	// Init
	//

	const init = ( parentObj ) => {
		// Parent Object
		const { settings } = parentObj;

		// Tab Vertical Orientation ?
		if ( true === settings.autoVerticalOrientation ) {
			tabVerticalOrientation( parentObj );
		}

		// Tab Panel Transition
		tabPanelTransition( parentObj );

		//
		// Events
		//

		// Click Event
		clickEvent( parentObj );

		// Key Event
		keyEvent( parentObj );
	};

	//
	// Tab Vertical Orientation
	//

	const tabVerticalOrientation = ( parentObj ) => {
		// Parent Object
		const { parentThis, settings } = parentObj;

		// Tab List
		const $tabList = parentThis.find( '> [role=tablist]' );

		// Tab Orientation
		parentThis.removeClass( 'vertical' );
		$tabList.removeAttr( 'aria-orientation' );
		if ( window.matchMedia( `(max-width: ${ settings.autoVerticalOrientationMaxWidth })` ).matches ) {
			parentThis.addClass( 'vertical' );
			$tabList.attr( 'aria-orientation', 'vertical' );
		}
	};

	//
	// Tab Panel Transition
	//

	const tabPanelTransition = ( parentObj ) => {
		// Parent Object
		const { parentThis, settings } = parentObj;

		// Active Tab and Tab Panel
		const $tab = parentThis.find( '> [role=tablist] > [role=tab][aria-selected=true]' );
		const $tabPanel = $( `#${ $tab.attr( 'aria-controls' ) }` );

		// Tab Panel Active Class Logic
		if ( true === settings.tabPanelTransitionLogic ) {
			// Tab Panel Active Class
			settings.tabPanelTransitionTimeout = setTimeout( () => {
				$tabPanel.addClass( settings.tabPanelTransitionClass );
			}, settings.tabPanelTransitionTimeoutDuration );
		}
	};

	//
	// Deactivate All Tabs and Tabs Panel
	//

	const deactivateTabs = ( parentObj ) => {
		// Args Object
		const { parentThis, settings } = parentObj;

		// Tabs and Tab Panels
		const $tabs = parentThis.find( '> [role=tablist] > [role=tab]' );
		const $tabsPanel = parentThis.find( '> [role=tabpanel]' );

		// Tabs Deactivation Logic
		$tabs.attr( 'tabindex', '-1' );
		$tabs.attr( 'aria-selected', 'false' );

		// Tabs Panel Deactivation Logic
		if ( true === settings.tabPanelTransitionLogic ) {
			$tabsPanel.removeClass( settings.tabPanelTransitionClass );
		}
		$tabsPanel.attr( 'hidden', 'hidden' );
	};

	//
	// Activate Current Tab and Tab Panel
	//

	const activateTab = ( parentObj, tab ) => {
		// Parent Object
		const { parentThis, settings } = parentObj;

		// Make sure tab is not already activated.
		if ( 'true' !== tab.attr( 'aria-selected' ) ) {
			// Deactivate All Tabs and Tabs Panel
			deactivateTabs( parentObj );

			// Tab Activation Logic
			tab.removeAttr( 'tabindex' );
			tab.attr( 'aria-selected', 'true' );

			// Tab Panel Activation Logic
			const $tabPanel = $( `#${ tab.attr( 'aria-controls' ) }` );
			$tabPanel.removeAttr( 'hidden' );

			// Tab Panel Transition
			tabPanelTransition( parentObj );

			// Callback
			settings.onTabActivation.call( { parentThis, tab } );
		}
	};

	//
	// Focus Orientation
	//

	const focusOrientation = ( parentObj, currentTab, direction ) => {
		// Parent Object
		const { settings } = parentObj;

		// Orientation Decision
		if ( 'prev' === direction ) {
			if ( currentTab.prev().index() !== -1 ) {
				// Tab
				const tab = currentTab.prev().focus();

				// Activate Current Tab and Tab Panel
				if ( true === settings.tabPanelAutoActivation ) {
					activateTab( parentObj, $( tab ) );
				}
			} else {
				focusLastTab( parentObj );
			}
		} else if ( 'next' === direction ) {
			if ( currentTab.next().index() !== -1 ) {
				// Tab
				const tab = currentTab.next().focus();

				// Activate Current Tab and Tab Panel
				if ( true === settings.tabPanelAutoActivation ) {
					activateTab( parentObj, $( tab ) );
				}
			} else {
				focusFirstTab( parentObj );
			}
		}
	};

	//
	// Focus First Tab
	//

	const focusFirstTab = ( parentObj ) => {
		// Parent Object
		const { parentThis, settings } = parentObj;

		// Tabs
		const $tabs = parentThis.find( '> [role=tablist] > [role=tab]' );

		// First Tab
		const tab = $tabs[ 0 ];

		// Focus
		tab.focus();

		// Activate Current Tab and Tab Panel
		if ( true === settings.tabPanelAutoActivation ) {
			activateTab( parentObj, $( tab ) );
		}
	};

	//
	// Focus Last Tab
	//

	const focusLastTab = ( parentObj ) => {
		// Parent Object
		const { parentThis, settings } = parentObj;

		// Tabs
		const $tabs = parentThis.find( '> [role=tablist] > [role=tab]' );

		// Last Tab
		const tab = $tabs[ ( $tabs.length ) - 1 ];

		// Focus
		tab.focus();

		// Activate Current Tab and Tab Panel
		if ( true === settings.tabPanelAutoActivation ) {
			activateTab( parentObj, $( tab ) );
		}
	};

	//
	// Resize Event
	//

	const resizeEvent = ( parentObj ) => {
		// Parent Object
		const { settings } = parentObj;

		// Resize is Required,
		// If need vertical orientation of tabs on mobile.
		if ( true === settings.autoVerticalOrientation ) {
			$( window ).resize( function() {
				// Init
				init( parentObj );
			} );
		}
	};

	//
	// Click Event
	//

	const clickEvent = ( parentObj ) => {
		// Parent Object
		const { parentThis } = parentObj;

		// Tabs Object within Scope
		const $tabs = parentThis.find( '> [role=tablist] > [role=tab]' );

		$tabs.off( 'click' ).on( 'click', function( e ) {
			// Prevent Default
			e.preventDefault();
			e.stopPropagation();

			// Activate Current Tab and Tab Panel
			activateTab( parentObj, $( this ) );
		} );
	};

	//
	// Key Event
	//

	const keyEvent = ( parentObj ) => {
		// Parent Object
		const { parentThis } = parentObj;

		// Tabs and Tablist
		const $tabs = parentThis.find( '> [role=tablist] > [role=tab]' );
		const $tablist = parentThis.find( '> [role=tablist]' );

		// Orientation Attribute
		const orientation = $tablist.attr( 'aria-orientation' );

		// Keys
		const keys = {
			enter: 13,
			space: 32,
			end: 35,
			home: 36,
			left: 37,
			up: 38,
			right: 39,
			down: 40,
		};

		//
		// Key Down
		//

		$tabs.off( 'keydown' ).on( 'keydown', function( e ) {
			// Prevent Default
			// It is not set here due to page scroll.

			// Switch
			switch ( e.which ) {
				case keys.end:
					// Prevent Default
					e.preventDefault();
					e.stopPropagation();

					// Focus Last Tab
					focusLastTab( parentObj );
					break;

				case keys.home:
					// Prevent Default
					e.preventDefault();
					e.stopPropagation();

					// Focus First Tab
					focusFirstTab( parentObj );
					break;

					//
					// Up and down are in keydown
					// because we need to prevent page scroll >:)
					//

				case keys.up:
					if ( orientation === 'vertical' ) {
						// Prevent Default
						e.preventDefault();
						e.stopPropagation();

						// Focus Orientation
						focusOrientation( parentObj, $( this ), 'prev' );
					}
					break;

				case keys.down:
					if ( orientation === 'vertical' ) {
						// Prevent Default
						e.preventDefault();
						e.stopPropagation();

						// Focus Orientation
						focusOrientation( parentObj, $( this ), 'next' );
					}
					break;
			}
		} );

		//
		// Key Up
		//

		$tabs.off( 'keyup' ).on( 'keyup', function( e ) {
			// Prevent Default
			e.preventDefault();
			e.stopPropagation();

			// Switch
			switch ( e.which ) {
				case keys.left:
					if ( orientation !== 'vertical' ) {
						// Focus Orientation
						focusOrientation( parentObj, $( this ), 'prev' );
					}
					break;

				case keys.right:
					if ( orientation !== 'vertical' ) {
						// Focus Orientation
						focusOrientation( parentObj, $( this ), 'next' );
					}
					break;

				case keys.enter:
				case keys.space:
					// Activate Current Tab and Tab Panel
					activateTab( parentObj, $( this ) );
					break;
			}
		} );
	};
}( jQuery ) );
