# Macaw Tabs
[Macaw Tabs](https://htmlcssfreebies.com/macaw-tabs/) is jQuery tabs plugin. It helps you to create accessible and responsive [jQuery tabs](https://htmlcssfreebies.com/tag/jquery-tabs/) by implementing the W3 [design patterns for tabs](https://www.w3.org/TR/wai-aria-practices-1.1/#tabpanel).

> Tabs are a set of layered sections of content, known as tab panels, that display one panel of content at a time. Each tab panel has an associated tab element, that when activated, displays the panel.

Design of vertical and horizontal tabs is very simple and easy with Macaw Tabs plugin.

## Features

- Flexible HTML Structure
- Vertical Orientation Support
- Horizontal Orientation Support
- Tabs with Automatic Activation Support
- Tabs with Manual Activation Support
- Nested Tabs Support
- Special Transition Class for Tab Panels
- Keyboard Interaction Support
- AI-ARIA Roles, States, and Properties Support
- Lot of Tabs Themes

## Setup

Macaw Tabs is very easy to setup in both HTML and CSS.

### HTML Document Head Setup

You may need the followings in the `head` tag of HTML document,

**Google Fonts**

```html
<!-- Google Fonts -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Oxygen:wght@400;700&family=Ubuntu:ital,wght@0,400;0,700;1,400;1,700&display=swap" rel="stylesheet">
```

**Icon Fonts**

```html
<!-- Icon Fonts -->
<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
```

**Macaw Tabs Theme**

```html
<!-- Macaw Tabs -->
<!-- Macaw Tabs Reset is Optional -->
<link rel="stylesheet" href="./dist/css/macaw-elegant-tabs-reset.css" type="text/css" media="all" />
<!-- Macaw Tabs Theme -->
<link rel="stylesheet" href="./dist/css/macaw-elegant-tabs.css" type="text/css" media="all" />
```

### HTML Document Body Setup

Here is the example of Macaw tabs HTML markup. You can use the following markup in the `body` tag of your HTML document.


```html
<div class="macaw-tabs macaw-elegant-tabs">
  <div role="tablist" aria-label="Resources">
    <button role="tab" aria-selected="true" aria-controls="blog-tab" id="blog"><span class="material-icons icon">assignment</span> <span class="label">Blog</span></button>
    <button role="tab" aria-selected="false" aria-controls="events-tab" id="events" tabindex="-1"><span class="material-icons icon">settings</span> <span class="label">Events</span></button>
    ....
    ....
  </div>

  <div tabindex="0" role="tabpanel" aria-labelledby="blog" id="blog-tab">
    <p>Vestibulum vitae feugiat quam, eget porttitor lacus.</p>
    <p>Cras volutpat diam quis odio cursus accumsan.</p>
  </div>
  <div tabindex="0" role="tabpanel" aria-labelledby="events" id="events-tab" hidden>
    <p>Nullam est ipsum, vestibulum non ullamcorper vitae.</p>
    <p>Class aptent taciti sociosqu ad litora torquent.</p>
  </div>
  ....
  ....
</div>
```

### HTML Document Footer Setup

You may need the followings in the `footer` tag of HTML document,

**jQuery Library**

```html
<!-- jQuery Library -->
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
```

**Macaw Tabs Plugin**

```html
<!-- Macaw Tabs Plugin -->
<script src="./dist/js/macaw-tabs.js"></script>
```

**Macaw Tabs Initialization**

```html
<!-- Macaw Tabs Initialization -->
<script>
  ( function ( $ ) {
    // Document Ready
    $( function () {
      $( '.macaw-tabs' ).macawTabs();
    } );
  } )( jQuery );
</script>
```

## Options

Macaw Tabs has the following options,

```javascript
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
```

### `tabPanelAutoActivation`

This option allows you to set Automatic Activation of `tabpanel` of focused `tab`.

```javascript
tabPanelAutoActivation: true | false
```

### `tabPanelTransitionLogic`

By default, Tab Panels have `hidden` attribute. It will be difficult to implement CSS transition when the hidden attribute is removed for active `tabpanel`. This option allows you to set a class for `tabpanel`. This class can be used to implement CSS transition easily.

```javascript
tabPanelTransitionLogic: true | false
```

### `tabPanelTransitionClass`

```javascript
tabPanelTransitionClass: 'active'
```

### `tabPanelTransitionTimeout`

```javascript
tabPanelTransitionTimeout: 0
```

### `tabPanelTransitionTimeoutDuration`

```javascript
tabPanelTransitionTimeoutDuration: 50
```

### `autoVerticalOrientation`

Horizontal or Vertical design of tabs is controlled by CSS. Left and Right Arrow Keys control the direction of horizontal tabs. If the design of tabs is vertical on small displays than this option is handy for you. It will set appropriate direction of Arrow Keys for Horizontal or Vertical design.

> Set this option `true`, if the design is vertical on small displays and horizontal on large displays. Set this option `false` if design is vertical at all displays.

```javascript
autoVerticalOrientation: true | false
```

### `autoVerticalOrientationMaxWidth`

This option allows the responsive boundary for the Horizontal or Vertical orientation.

```javascript
autoVerticalOrientationMaxWidth: '575px'
```

## Methods

Macaw Tabs has the following methods,

### `onTabActivation`

This method will be called when a tab is set to active.

## Keyboard Interaction Support

Special care has been given on the accessibility features. Tabs and Tabs Panels can easily be accessed with keyboard.

### Tab Key

When focus moves into the tab list, places focus on the active tab element. When the tab list contains the focus, moves focus to the next element in the page tab sequence outside the tablist, which is typically either the first focusable element inside the tab panel or the tab panel itself.

### Right Arrow Key

When focus is on a tab element in a horizontal tab list, Right Arrow key Moves focus to the next tab. If focus is on the last tab element, moves focus to the first tab. Optionally, activates the newly focused tab.

### Left Arrow Key

When focus is on a tab element in a horizontal tab list, Left Arrow key moves focus to the previous tab. If focus is on the first tab, moves focus to the last tab. Optionally, activates the newly focused tab.

### Down Arrow Key

If the tabs in a tab list are arranged vertically, Down Arrow key performs as Right Arrow key as described above.

### Up Arrow Key

If the tabs in a tab list are arranged vertically, Up Arrow key performs as Left Arrow key as described above.

### Space or Enter Key

When focus is on a tab in a tablist with either horizontal or vertical orientation, Space or Enter key activates the tab if it was not activated automatically on focus.

### Home Key

When focus is on a tab in a tablist with either horizontal or vertical orientation, Home key moves focus to the first tab. Optionally, activates the newly focused tab.

### End Key

When focus is on a tab in a tablist with either horizontal or vertical orientation, End key moves focus to the last tab. Optionally, activates the newly focused tab.

## WAI-ARIA Roles, States, and Properties

Macaw Tabs jQuery pluign is developed to care the accessibility attributes in mind. Its HTML and CSS has satisfied the role, properties, states and attributes.

- The element that serves as the container for the set of tabs has role `tablist`.
- Each element that serves as a tab has role `tab` and is contained within the element with role `tablist`.
- Each element that contains the content panel for a tab has role `tabpanel`.
- If the tab list has a visible label, the element with role `tablist` has `aria-labelledby` set to a value that refers to the labelling element. Otherwise, the `tablist` element has a label provided by `aria-label`.
- Each element with role `tab` has the property `aria-controls` referring to its associated `tabpanel` element.
- The active `tab` element has the state `aria-selected` set to `true` and all other `tab` elements have it set to `false`.
- Each element with role `tabpanel` has the property `aria-labelledby` referring to its associated `tab` element.
- If the `tablist` element is vertically oriented, it has the property `aria-orientation` set to `vertical`. The default value of `aria-orientation` for a tablist element is `horizontal`.

## Tab Themes

We are sharing Macaw Tab themes frequently to help you. Please have a look,

- [CSS Tabs](https://htmlcssfreebies.com/tag/css-tabs/)
- [Vertical Tabs](https://htmlcssfreebies.com/tag/vertical-tabs/)
- [Nested Tabs](https://htmlcssfreebies.com/tag/nested-tabs/)
- [Animate CSS Tab Example](https://htmlcssfreebies.com/macaw-aurora-tabs/), using [Animate CSS](https://animate.style/)

Build With Love :heart:
