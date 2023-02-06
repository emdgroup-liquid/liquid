---
eleventyNavigation:
  key: Table
  parent: Components
layout: layout.njk
title: Table
permalink: components/ld-table/
---

# ld-table

<link rel="stylesheet" href="css_components/ld-table.css">

The `ld-table` component represents tabular data — that is, information presented in a two-dimensional table comprised of rows and columns of cells containing data.

---

<ld-notice mode="info">
  Some of the more advanced examples below use <a href="https://vuejs.org/guide/quick-start.html#without-build-tools" target="_blank" rel="noreferrer noopener">Vue with template strings</a>.
</ld-notice>

## Introduction

A table can be a simple UI element that only displays a couple of rows and columns of data. However, if you deal with large amounts of data, the table needs to be enhanced with features for navigating through that data and interacting with it.

The `ld-table` component is available as a CSS component, which only adds styles to native HTML tabular data elements, and as a Web Component, which adds enhancements, such as for sorting and selecting data.

## Usage

You can use the `ld-table` component component in a very similar way to how you would use the native tabular data elements in HTML. Here is a simple table using a `colgroup` element as an example.

{% example '{ "stacked": true }' %}
<ld-table>
  <ld-table-toolbar slot="toolbar">
    <ld-table-caption>
      Superheros and sidekicks
    </ld-table-caption>
  </ld-table-toolbar>
  <ld-table-colgroup>
    <ld-table-col></ld-table-col>
    <ld-table-col span="2" class="batman"></ld-table-col>
    <ld-table-col span="2" class="flash"></ld-table-col>
  </ld-table-colgroup>
  <ld-table-body>
    <ld-table-row>
      <ld-table-cell></ld-table-cell>
      <ld-table-header scope="col">Batman</ld-table-header>
      <ld-table-header scope="col">Robin</ld-table-header>
      <ld-table-header scope="col">The Flash</ld-table-header>
      <ld-table-header scope="col">Kid Flash</ld-table-header>
    </ld-table-row>
    <ld-table-row>
      <ld-table-header scope="row">Skill</ld-table-header>
      <ld-table-cell>Smarts</ld-table-cell>
      <ld-table-cell>Dex, acrobat</ld-table-cell>
      <ld-table-cell>Super speed</ld-table-cell>
      <ld-table-cell>Super speed</ld-table-cell>
    </ld-table-row>
  </ld-table-body>
</ld-table>

<!-- React component -->

<LdTable>
  <LdTableToolbar slot="toolbar">
    <LdTableCaption>Superheros and sidekicks</LdTableCaption>
  </LdTableToolbar>
  <LdTableColgroup>
    <LdTableCol />
    <LdTableCol span={2} class="batman" />
    <LdTableCol span={2} class="flash" />
  </LdTableColgroup>
  <LdTableBody>
    <LdTableRow>
      <LdTableCell></LdTableCell>
      <LdTableHeader scope="col">Batman</LdTableHeader>
      <LdTableHeader scope="col">Robin</LdTableHeader>
      <LdTableHeader scope="col">The Flash</LdTableHeader>
      <LdTableHeader scope="col">Kid Flash</LdTableHeader>
    </LdTableRow>
    <LdTableRow>
      <LdTableHeader scope="row">Skill</LdTableHeader>
      <LdTableCell>Smarts</LdTableCell>
      <LdTableCell>Dex, acrobat</LdTableCell>
      <LdTableCell>Super speed</LdTableCell>
      <LdTableCell>Super speed</LdTableCell>
    </LdTableRow>
  </LdTableBody>
</LdTable>

<!-- CSS component -->

<figure class="ld-table">
  <div class="ld-table__toolbar">
    <figcaption>
      Superheros and sidekicks
    </figcaption>
  </div>
  <div class="ld-table__scroll-container">
    <table>
      <colgroup>
        <col></col>
        <col span="2" class="batman"></col>
        <col span="2" class="flash"></col>
      </colgroup>
      <tbody>
        <tr>
          <td></td>
          <th scope="col">Batman</th>
          <th scope="col">Robin</th>
          <th scope="col">The Flash</th>
          <th scope="col">Kid Flash</th>
        </tr>
        <tr>
          <th scope="row">Skill</th>
          <td>Smarts</td>
          <td>Dex, acrobat</td>
          <td>Super speed</td>
          <td>Super speed</td>
        </tr>
      </tbody>
    </table>
  </div>
</figure>
{% endexample %}

### Sorting

Sorting is a built-in feature of the Web Component version of the `ld-table` component.

#### Default sorting

The default sorting mechanism sorts the currently rendered table rows based on the text content of the column associated with the sort call.

<ld-notice mode="warning">
  If you use a UI library that, for some reason, triggers a rerender of your table, the sorting will be reset. Try to avoid unnecessary render cycles. If you can't, you may need to set up <a href="/components/ld-table/#custom-sorting">custom sorting</a> which relies on your application state.
</ld-notice>

{% example '{ "stacked": true }' %}
<style>
  .chinese-div-by-pop { max-height: 26rem; }
  .chinese-div-by-pop :is(ld-table-header, ld-table-cell):not(:first-child) {
    text-align: right;
  }
</style>

<ld-table class="chinese-div-by-pop">
  <ld-table-toolbar slot="toolbar">
    <ld-table-caption>
      Chinese administrative divisions by population in 2017
    </ld-table-caption>
  </ld-table-toolbar>
  <ld-table-head>
    <ld-table-row>
      <ld-table-header sortable>Administrative Division</ld-table-header>
      <ld-table-header sortable sort-order="desc">Total</ld-table-header>
      <ld-table-header sortable>Urban</ld-table-header>
      <ld-table-header sortable>Rural</ld-table-header>
    </ld-table-row>
  </ld-table-head>
  <ld-table-body>
    <ld-table-row>
      <ld-table-cell>Mainland China</ld-table-cell>
      <ld-table-cell>1,485,710,000</ld-table-cell>
      <ld-table-cell>831,370,000</ld-table-cell>
      <ld-table-cell>564,010,000</ld-table-cell>
    </ld-table-row>
    <ld-table-row>
      <ld-table-cell>Guangdong</ld-table-cell>
      <ld-table-cell>188,690,000</ld-table-cell>
      <ld-table-cell>78,020,000</ld-table-cell>
      <ld-table-cell>33,670,000</ld-table-cell>
    </ld-table-row>
    <ld-table-row>
      <ld-table-cell>Shandong</ld-table-cell>
      <ld-table-cell>167,060,000</ld-table-cell>
      <ld-table-cell>60,620,000</ld-table-cell>
      <ld-table-cell>39,440,000</ld-table-cell>
    </ld-table-row>
    <ld-table-row>
      <ld-table-cell>Henan</ld-table-cell>
      <ld-table-cell>163,590,000</ld-table-cell>
      <ld-table-cell>47,950,000</ld-table-cell>
      <ld-table-cell>47,640,000</ld-table-cell>
    </ld-table-row>
    <ld-table-row>
      <ld-table-cell>Sichuan</ld-table-cell>
      <ld-table-cell>158,020,000</ld-table-cell>
      <ld-table-cell>42,170,000</ld-table-cell>
      <ld-table-cell>40,850,000</ld-table-cell>
    </ld-table-row>
    <ld-table-row>
      <ld-table-cell>Jiangsu</ld-table-cell>
      <ld-table-cell>156,290,000</ld-table-cell>
      <ld-table-cell>55,210,000</ld-table-cell>
      <ld-table-cell>25,080,000</ld-table-cell>
    </ld-table-row>
    <ld-table-row>
      <ld-table-cell>Hebei</ld-table-cell>
      <ld-table-cell>135,200,000</ld-table-cell>
      <ld-table-cell>41,360,000</ld-table-cell>
      <ld-table-cell>33,830,000</ld-table-cell>
    </ld-table-row>
    <ld-table-row>
      <ld-table-cell>Hunan</ld-table-cell>
      <ld-table-cell>127,600,000</ld-table-cell>
      <ld-table-cell>37,470,000</ld-table-cell>
      <ld-table-cell>31,130,000</ld-table-cell>
    </ld-table-row>
    <ld-table-row>
      <ld-table-cell>Anhui</ld-table-cell>
      <ld-table-cell>118,550,000</ld-table-cell>
      <ld-table-cell>33,460,000</ld-table-cell>
      <ld-table-cell>29,090,000</ld-table-cell>
    </ld-table-row>
    <ld-table-row>
      <ld-table-cell>Hubei</ld-table-cell>
      <ld-table-cell>95,020,000</ld-table-cell>
      <ld-table-cell>35,000,000</ld-table-cell>
      <ld-table-cell>24,020,000</ld-table-cell>
    </ld-table-row>
    <ld-table-row>
      <ld-table-cell>Zhejiang</ld-table-cell>
      <ld-table-cell>92,570,000</ld-table-cell>
      <ld-table-cell>38,470,000</ld-table-cell>
      <ld-table-cell>18,100,000</ld-table-cell>
    </ld-table-row>
    <ld-table-row>
      <ld-table-cell>Guangxi</ld-table-cell>
      <ld-table-cell>85,850,000</ld-table-cell>
      <ld-table-cell>24,040,000</ld-table-cell>
      <ld-table-cell>24,810,000</ld-table-cell>
    </ld-table-row>
    <ld-table-row>
      <ld-table-cell>Yunnan</ld-table-cell>
      <ld-table-cell>68,010,000</ld-table-cell>
      <ld-table-cell>22,410,000</ld-table-cell>
      <ld-table-cell>25,590,000</ld-table-cell>
    </ld-table-row>
    <ld-table-row>
      <ld-table-cell>Jiangxi</ld-table-cell>
      <ld-table-cell>65,220,000</ld-table-cell>
      <ld-table-cell>25,240,000</ld-table-cell>
      <ld-table-cell>20,980,000</ld-table-cell>
    </ld-table-row>
    <ld-table-row>
      <ld-table-cell>Liaoning</ld-table-cell>
      <ld-table-cell>63,690,000</ld-table-cell>
      <ld-table-cell>29,490,000</ld-table-cell>
      <ld-table-cell>14,200,000</ld-table-cell>
    </ld-table-row>
    <ld-table-row>
      <ld-table-cell>Fujian</ld-table-cell>
      <ld-table-cell>58,110,000</ld-table-cell>
      <ld-table-cell>25,340,000</ld-table-cell>
      <ld-table-cell>13,770,000</ld-table-cell>
    </ld-table-row>
    <ld-table-row>
      <ld-table-cell>Shaanxi</ld-table-cell>
      <ld-table-cell>54,350,000</ld-table-cell>
      <ld-table-cell>21,780,000</ld-table-cell>
      <ld-table-cell>16,570,000</ld-table-cell>
    </ld-table-row>
    <ld-table-row>
      <ld-table-cell>Heilongjiang</ld-table-cell>
      <ld-table-cell>53,890,000</ld-table-cell>
      <ld-table-cell>22,500,000</ld-table-cell>
      <ld-table-cell>15,380,000</ld-table-cell>
    </ld-table-row>
    <ld-table-row>
      <ld-table-cell>Shanxi</ld-table-cell>
      <ld-table-cell>48,820,000</ld-table-cell>
      <ld-table-cell>21,230,000</ld-table-cell>
      <ld-table-cell>15,790,000</ld-table-cell>
    </ld-table-row>
    <ld-table-row>
      <ld-table-cell>Guizhou</ld-table-cell>
      <ld-table-cell>45,550,000</ld-table-cell>
      <ld-table-cell>16,480,000</ld-table-cell>
      <ld-table-cell>19,320,000</ld-table-cell>
    </ld-table-row>
    <ld-table-row>
      <ld-table-cell>Chongqing</ld-table-cell>
      <ld-table-cell>33,750,000</ld-table-cell>
      <ld-table-cell>19,710,000</ld-table-cell>
      <ld-table-cell>11,050,000</ld-table-cell>
    </ld-table-row>
    <ld-table-row>
      <ld-table-cell>Jilin</ld-table-cell>
      <ld-table-cell>27,170,000</ld-table-cell>
      <ld-table-cell>15,390,000</ld-table-cell>
      <ld-table-cell>11,780,000</ld-table-cell>
    </ld-table-row>
    <ld-table-row>
      <ld-table-cell>Gansu</ld-table-cell>
      <ld-table-cell>26,260,000</ld-table-cell>
      <ld-table-cell>12,180,000</ld-table-cell>
      <ld-table-cell>14,080,000</ld-table-cell>
    </ld-table-row>
    <ld-table-row>
      <ld-table-cell>Inner Mongolia</ld-table-cell>
      <ld-table-cell>25,290,000</ld-table-cell>
      <ld-table-cell>15,680,000</ld-table-cell>
      <ld-table-cell>9,610,000</ld-table-cell>
    </ld-table-row>
    <ld-table-row>
      <ld-table-cell>Xinjiang</ld-table-cell>
      <ld-table-cell>24,450,000</ld-table-cell>
      <ld-table-cell>12,070,000</ld-table-cell>
      <ld-table-cell>12,380,000</ld-table-cell>
    </ld-table-row>
    <ld-table-row>
      <ld-table-cell>Shanghai</ld-table-cell>
      <ld-table-cell>24,180,000</ld-table-cell>
      <ld-table-cell>21,210,000</ld-table-cell>
      <ld-table-cell>2,970,000</ld-table-cell>
    </ld-table-row>
    <ld-table-row>
      <ld-table-cell>Beijing</ld-table-cell>
      <ld-table-cell>21,710,000</ld-table-cell>
      <ld-table-cell>18,780,000</ld-table-cell>
      <ld-table-cell>2,930,000</ld-table-cell>
    </ld-table-row>
    <ld-table-row>
      <ld-table-cell>Tianjin</ld-table-cell>
      <ld-table-cell>15,570,000</ld-table-cell>
      <ld-table-cell>12,910,000</ld-table-cell>
      <ld-table-cell>2,660,000</ld-table-cell>
    </ld-table-row>
    <ld-table-row>
      <ld-table-cell>Hainan</ld-table-cell>
      <ld-table-cell>9,170,000</ld-table-cell>
      <ld-table-cell>5,370,000</ld-table-cell>
      <ld-table-cell>3,890,000</ld-table-cell>
    </ld-table-row>
    <ld-table-row>
      <ld-table-cell>Hong Kong</ld-table-cell>
      <ld-table-cell>7,335,384</ld-table-cell>
      <ld-table-cell>7,335,384</ld-table-cell>
      <ld-table-cell>-</ld-table-cell>
    </ld-table-row>
    <ld-table-row>
      <ld-table-cell>Ningxia</ld-table-cell>
      <ld-table-cell>6,820,000</ld-table-cell>
      <ld-table-cell>3,950,000</ld-table-cell>
      <ld-table-cell>2,870,000</ld-table-cell>
    </ld-table-row>
    <ld-table-row>
      <ld-table-cell>Qinghai</ld-table-cell>
      <ld-table-cell>5,980,000</ld-table-cell>
      <ld-table-cell>3,170,000</ld-table-cell>
      <ld-table-cell>2,810,000</ld-table-cell>
    </ld-table-row>
    <ld-table-row>
      <ld-table-cell>Tibet</ld-table-cell>
      <ld-table-cell>3,370,000</ld-table-cell>
      <ld-table-cell>1,040,000</ld-table-cell>
      <ld-table-cell>2,330,000</ld-table-cell>
    </ld-table-row>
    <ld-table-row>
      <ld-table-cell>Macao</ld-table-cell>
      <ld-table-cell>644,900</ld-table-cell>
      <ld-table-cell>644,900</ld-table-cell>
      <ld-table-cell>-</ld-table-cell>
    </ld-table-row>
  </ld-table-body>
</ld-table>

<!-- React component -->

<LdTable style={ { maxHeight: '26rem' } }>
  <LdTableToolbar slot="toolbar">
    <LdTableCaption>
      Chinese administrative divisions by population in 2017
    </LdTableCaption>
  </LdTableToolbar>
  <LdTableHead style={ { textAlign: 'right' } }>
    <LdTableRow>
      <LdTableHeader sortable style={ { textAlign: 'left' } }>
        Administrative Division
      </LdTableHeader>
      <LdTableHeader sortable sortOrder="desc">
        Total
      </LdTableHeader>
      <LdTableHeader sortable>Urban</LdTableHeader>
      <LdTableHeader sortable>Rural</LdTableHeader>
    </LdTableRow>
  </LdTableHead>
  <LdTableBody style={ { textAlign: 'right' } }>
    <LdTableRow>
      <LdTableCell style={ { textAlign: 'left' } }>
        Mainland China
      </LdTableCell>
      <LdTableCell>1,485,710,000</LdTableCell>
      <LdTableCell>831,370,000</LdTableCell>
      <LdTableCell>564,010,000</LdTableCell>
    </LdTableRow>
    <LdTableRow>
      <LdTableCell style={ { textAlign: 'left' } }>Guangdong</LdTableCell>
      <LdTableCell>188,690,000</LdTableCell>
      <LdTableCell>78,020,000</LdTableCell>
      <LdTableCell>33,670,000</LdTableCell>
    </LdTableRow>
    <LdTableRow>
      <LdTableCell style={ { textAlign: 'left' } }>Shandong</LdTableCell>
      <LdTableCell>167,060,000</LdTableCell>
      <LdTableCell>60,620,000</LdTableCell>
      <LdTableCell>39,440,000</LdTableCell>
    </LdTableRow>
    <LdTableRow>
      <LdTableCell style={ { textAlign: 'left' } }>Henan</LdTableCell>
      <LdTableCell>163,590,000</LdTableCell>
      <LdTableCell>47,950,000</LdTableCell>
      <LdTableCell>47,640,000</LdTableCell>
    </LdTableRow>
    <LdTableRow>
      <LdTableCell style={ { textAlign: 'left' } }>Sichuan</LdTableCell>
      <LdTableCell>158,020,000</LdTableCell>
      <LdTableCell>42,170,000</LdTableCell>
      <LdTableCell>40,850,000</LdTableCell>
    </LdTableRow>
    <LdTableRow>
      <LdTableCell style={ { textAlign: 'left' } }>Jiangsu</LdTableCell>
      <LdTableCell>156,290,000</LdTableCell>
      <LdTableCell>55,210,000</LdTableCell>
      <LdTableCell>25,080,000</LdTableCell>
    </LdTableRow>
    <LdTableRow>
      <LdTableCell style={ { textAlign: 'left' } }>Hebei</LdTableCell>
      <LdTableCell>135,200,000</LdTableCell>
      <LdTableCell>41,360,000</LdTableCell>
      <LdTableCell>33,830,000</LdTableCell>
    </LdTableRow>
    <LdTableRow>
      <LdTableCell style={ { textAlign: 'left' } }>Hunan</LdTableCell>
      <LdTableCell>127,600,000</LdTableCell>
      <LdTableCell>37,470,000</LdTableCell>
      <LdTableCell>31,130,000</LdTableCell>
    </LdTableRow>
    <LdTableRow>
      <LdTableCell style={ { textAlign: 'left' } }>Anhui</LdTableCell>
      <LdTableCell>118,550,000</LdTableCell>
      <LdTableCell>33,460,000</LdTableCell>
      <LdTableCell>29,090,000</LdTableCell>
    </LdTableRow>
    <LdTableRow>
      <LdTableCell style={ { textAlign: 'left' } }>Hubei</LdTableCell>
      <LdTableCell>95,020,000</LdTableCell>
      <LdTableCell>35,000,000</LdTableCell>
      <LdTableCell>24,020,000</LdTableCell>
    </LdTableRow>
    <LdTableRow>
      <LdTableCell style={ { textAlign: 'left' } }>Zhejiang</LdTableCell>
      <LdTableCell>92,570,000</LdTableCell>
      <LdTableCell>38,470,000</LdTableCell>
      <LdTableCell>18,100,000</LdTableCell>
    </LdTableRow>
    <LdTableRow>
      <LdTableCell style={ { textAlign: 'left' } }>Guangxi</LdTableCell>
      <LdTableCell>85,850,000</LdTableCell>
      <LdTableCell>24,040,000</LdTableCell>
      <LdTableCell>24,810,000</LdTableCell>
    </LdTableRow>
    <LdTableRow>
      <LdTableCell style={ { textAlign: 'left' } }>Yunnan</LdTableCell>
      <LdTableCell>68,010,000</LdTableCell>
      <LdTableCell>22,410,000</LdTableCell>
      <LdTableCell>25,590,000</LdTableCell>
    </LdTableRow>
    <LdTableRow>
      <LdTableCell style={ { textAlign: 'left' } }>Jiangxi</LdTableCell>
      <LdTableCell>65,220,000</LdTableCell>
      <LdTableCell>25,240,000</LdTableCell>
      <LdTableCell>20,980,000</LdTableCell>
    </LdTableRow>
    <LdTableRow>
      <LdTableCell style={ { textAlign: 'left' } }>Liaoning</LdTableCell>
      <LdTableCell>63,690,000</LdTableCell>
      <LdTableCell>29,490,000</LdTableCell>
      <LdTableCell>14,200,000</LdTableCell>
    </LdTableRow>
    <LdTableRow>
      <LdTableCell style={ { textAlign: 'left' } }>Fujian</LdTableCell>
      <LdTableCell>58,110,000</LdTableCell>
      <LdTableCell>25,340,000</LdTableCell>
      <LdTableCell>13,770,000</LdTableCell>
    </LdTableRow>
    <LdTableRow>
      <LdTableCell style={ { textAlign: 'left' } }>Shaanxi</LdTableCell>
      <LdTableCell>54,350,000</LdTableCell>
      <LdTableCell>21,780,000</LdTableCell>
      <LdTableCell>16,570,000</LdTableCell>
    </LdTableRow>
    <LdTableRow>
      <LdTableCell style={ { textAlign: 'left' } }>
        Heilongjiang
      </LdTableCell>
      <LdTableCell>53,890,000</LdTableCell>
      <LdTableCell>22,500,000</LdTableCell>
      <LdTableCell>15,380,000</LdTableCell>
    </LdTableRow>
    <LdTableRow>
      <LdTableCell style={ { textAlign: 'left' } }>Shanxi</LdTableCell>
      <LdTableCell>48,820,000</LdTableCell>
      <LdTableCell>21,230,000</LdTableCell>
      <LdTableCell>15,790,000</LdTableCell>
    </LdTableRow>
    <LdTableRow>
      <LdTableCell style={ { textAlign: 'left' } }>Guizhou</LdTableCell>
      <LdTableCell>45,550,000</LdTableCell>
      <LdTableCell>16,480,000</LdTableCell>
      <LdTableCell>19,320,000</LdTableCell>
    </LdTableRow>
    <LdTableRow>
      <LdTableCell style={ { textAlign: 'left' } }>Chongqing</LdTableCell>
      <LdTableCell>33,750,000</LdTableCell>
      <LdTableCell>19,710,000</LdTableCell>
      <LdTableCell>11,050,000</LdTableCell>
    </LdTableRow>
    <LdTableRow>
      <LdTableCell style={ { textAlign: 'left' } }>Jilin</LdTableCell>
      <LdTableCell>27,170,000</LdTableCell>
      <LdTableCell>15,390,000</LdTableCell>
      <LdTableCell>11,780,000</LdTableCell>
    </LdTableRow>
    <LdTableRow>
      <LdTableCell style={ { textAlign: 'left' } }>Gansu</LdTableCell>
      <LdTableCell>26,260,000</LdTableCell>
      <LdTableCell>12,180,000</LdTableCell>
      <LdTableCell>14,080,000</LdTableCell>
    </LdTableRow>
    <LdTableRow>
      <LdTableCell style={ { textAlign: 'left' } }>
        Inner Mongolia
      </LdTableCell>
      <LdTableCell>25,290,000</LdTableCell>
      <LdTableCell>15,680,000</LdTableCell>
      <LdTableCell>9,610,000</LdTableCell>
    </LdTableRow>
    <LdTableRow>
      <LdTableCell style={ { textAlign: 'left' } }>Xinjiang</LdTableCell>
      <LdTableCell>24,450,000</LdTableCell>
      <LdTableCell>12,070,000</LdTableCell>
      <LdTableCell>12,380,000</LdTableCell>
    </LdTableRow>
    <LdTableRow>
      <LdTableCell style={ { textAlign: 'left' } }>Shanghai</LdTableCell>
      <LdTableCell>24,180,000</LdTableCell>
      <LdTableCell>21,210,000</LdTableCell>
      <LdTableCell>2,970,000</LdTableCell>
    </LdTableRow>
    <LdTableRow>
      <LdTableCell style={ { textAlign: 'left' } }>Beijing</LdTableCell>
      <LdTableCell>21,710,000</LdTableCell>
      <LdTableCell>18,780,000</LdTableCell>
      <LdTableCell>2,930,000</LdTableCell>
    </LdTableRow>
    <LdTableRow>
      <LdTableCell style={ { textAlign: 'left' } }>Tianjin</LdTableCell>
      <LdTableCell>15,570,000</LdTableCell>
      <LdTableCell>12,910,000</LdTableCell>
      <LdTableCell>2,660,000</LdTableCell>
    </LdTableRow>
    <LdTableRow>
      <LdTableCell style={ { textAlign: 'left' } }>Hainan</LdTableCell>
      <LdTableCell>9,170,000</LdTableCell>
      <LdTableCell>5,370,000</LdTableCell>
      <LdTableCell>3,890,000</LdTableCell>
    </LdTableRow>
    <LdTableRow>
      <LdTableCell style={ { textAlign: 'left' } }>Hong Kong</LdTableCell>
      <LdTableCell>7,335,384</LdTableCell>
      <LdTableCell>7,335,384</LdTableCell>
      <LdTableCell>-</LdTableCell>
    </LdTableRow>
    <LdTableRow>
      <LdTableCell style={ { textAlign: 'left' } }>Ningxia</LdTableCell>
      <LdTableCell>6,820,000</LdTableCell>
      <LdTableCell>3,950,000</LdTableCell>
      <LdTableCell>2,870,000</LdTableCell>
    </LdTableRow>
    <LdTableRow>
      <LdTableCell style={ { textAlign: 'left' } }>Qinghai</LdTableCell>
      <LdTableCell>5,980,000</LdTableCell>
      <LdTableCell>3,170,000</LdTableCell>
      <LdTableCell>2,810,000</LdTableCell>
    </LdTableRow>
    <LdTableRow>
      <LdTableCell style={ { textAlign: 'left' } }>Tibet</LdTableCell>
      <LdTableCell>3,370,000</LdTableCell>
      <LdTableCell>1,040,000</LdTableCell>
      <LdTableCell>2,330,000</LdTableCell>
    </LdTableRow>
    <LdTableRow>
      <LdTableCell style={ { textAlign: 'left' } }>Macao</LdTableCell>
      <LdTableCell>644,900</LdTableCell>
      <LdTableCell>644,900</LdTableCell>
      <LdTableCell>-</LdTableCell>
    </LdTableRow>
  </LdTableBody>
</LdTable>

{% endexample %}

#### Custom sorting

In cases where the default sorting functionality is not suitable, you can prevent it and use your own custom sorting mechanism by listening to the <code>ldTableSort</code> event.

<ld-notice mode="warning">
  Please note that you must use <a href="https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener#usecapture" target="_blank" rel="noreferrer noopener">capture</a> in order to prevent the default behavior.
</ld-notice>

{% example '{ "stacked": true }' %}
<style>
  .numerals { max-height: 26rem; }
</style>
<div id="example-custom-sorting"></div>
<script type="module">
  import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.prod.js'
  const app = createApp({
    data() {
      return {
        elements: [],
        sortOrder: null,
      }
    },
    computed: {
      elementsSorted() {
        if (!this.elements || !this.sortOrder) return this.elements
        return [...this.elements].sort((a, b) => {
          const key = ['arabic', 'roman'][this.sortOrder.columnIndex]
          const val1 = (this.sortOrder.sortOrder === 'asc' ? a : b)[key]
          const val2 = (this.sortOrder.sortOrder === 'asc' ? b : a)[key]
          const num1 = key === 'arabic' ? parseFloat(val1) : this.romanToArabic(val1)
          const num2 = key === 'arabic' ? parseFloat(val2) : this.romanToArabic(val2)
          return num1 - num2
        })
      },
    },
    async created() {
      try {
        const data = await fetch('{{ env.base }}/{{ buildstamp }}assets/examples/numerals.json').then((res) => res.json())
        this.elements = data.elements
      } catch (err) {
        console.error(err)
      }
    },
    methods: {
      onSort(ev) {
        this.currentPage = 0
        this.sortOrder = ev.detail
      },
      romanToArabic(s) {
        const map = {'I': 1, 'V': 5, 'X': 10, 'L': 50, 'C': 100, 'D': 500, 'M': 1000};
        return [...s].reduceRight(({sum,order}, c, i, s) =>
          Object.keys(map).indexOf(c) < order
            ? {sum: sum - map[c], order}
            : {sum: sum + map[c], order: Object.keys(map).indexOf(c)},
          {
            sum: 0,
            order: Object.keys(map).indexOf(s[s.length-1])
          }
        ).sum
      }
    },
    template: `
      <ld-table
        class="numerals"
        v-on:ldTableSort.capture.prevent="onSort"
      >
        <ld-table-toolbar slot="toolbar">
          <ld-table-caption>
            Arabic and roman numerals from 1 to 1000
          </ld-table-caption>
        </ld-table-toolbar>
        <ld-table-head>
          <ld-table-row>
            <ld-table-header sortable>Arabic</ld-table-header>
            <ld-table-header sortable>Roman</ld-table-header>
          </ld-table-row>
        </ld-table-head>
        <ld-table-body>
          <template v-if="!elements.length">
            <ld-table-row>
              <ld-table-cell colspan="6" style="text-align: center">
                <ld-loading></ld-loading>
              </ld-table-cell>
            </ld-table-row>
          </template>
          <template v-else>
            <template v-for="(element, rowIndex) in elementsSorted">
              <ld-table-row>
                <ld-table-cell>\{\{element.arabic\}\}</ld-table-cell>
                <ld-table-cell>\{\{element.roman\}\}</ld-table-cell>
              </ld-table-row>
            </template>
          </template>
        </ld-table-body>
      </ld-table>`,
  })
  app.config.compilerOptions.isCustomElement = (tag) => tag.startsWith('ld-')
  app.mount('#example-custom-sorting')
</script>

<!-- React component -->

const [elements, setElements] = useState([])
const [sortOrder, setSortOrder] = useState(null)

const tableRef = useRef()

useEffect(() => {
  fetch('assets/examples/numerals.json')
    .then((res) => res.json())
    .then((data) => {
      setElements(data.elements)
    })
}, [])

useEffect(() => {
  if (!tableRef.current) return

  tableRef.current.addEventListener('ldTableSort', onSort, true)
  return () => tableRef.current.removeEventListener('ldTableSort', onSort, true)
}, [])

function onSort(ev) {
  setCurrentPage(0)
  setSortOrder(ev.detail)
}

const sortedElements = useMemo(() => {
  if (!elements || !sortOrder) return elements

  return [...elements].sort((a, b) => {
    const key = ['arabic', 'roman'][sortOrder.columnIndex]
    const val1 = (sortOrder.sortOrder === 'asc' ? a : b)[key]
    const val2 = (sortOrder.sortOrder === 'asc' ? b : a)[key]
    const num1 = key === 'arabic' ? parseFloat(val1) : romanToArabic(val1)
    const num2 = key === 'arabic' ? parseFloat(val2) : romanToArabic(val2)
    return num1 - num2
  })
}, [elements, sortOrder])

function romanToArabic(roman) {
  const map = { I: 1, V: 5, X: 10, L: 50, C: 100, D: 500, M: 1000 }
  return [...roman].reduceRight(
    ({ sum, order }, c, i, s) =>
      Object.keys(map).indexOf(c) < order
        ? { sum: sum - map[c], order }
        : { sum: sum + map[c], order: Object.keys(map).indexOf(c) },
    {
      sum: 0,
      order: Object.keys(map).indexOf(roman[roman.length - 1]),
    }
  ).sum
}

return (
  <LdTable ref={tableRef} style={ { maxHeight: '26rem' } }>
    <LdTableToolbar slot="toolbar">
      <LdTableCaption>
        Arabic and roman numerals from 1 to 1000
      </LdTableCaption>
    </LdTableToolbar>
    <LdTableHead>
      <LdTableRow>
        <LdTableHeader sortable>Arabic</LdTableHeader>
        <LdTableHeader sortable>Roman</LdTableHeader>
      </LdTableRow>
    </LdTableHead>
    <LdTableBody>
      {sortedElements.length > 0 ? (
        sortedElements.map((element, index) => (
          <LdTableRow key={element.arabic}>
            <LdTableCell>{element.arabic}</LdTableCell>
            <LdTableCell>{element.roman}</LdTableCell>
          </LdTableRow>
        ))
      ) : (
        <LdTableRow>
          <LdTableCell colspan={6} style={ { textAlign: 'center' } }>
            <LdLoading />
          </LdTableCell>
        </LdTableRow>
      )}
    </LdTableBody>
  </LdTable>
)

{% endexample %}

Please note that the example above is for illustration only: The default sorting would have worked as well for the given data. However, the same setup will make much more sense as soon as we add [pagination](/components/ld-table#pagination) to the table.  

### Selection

A common requirement is to allow the user to select individual or all rows in a table. In order to implement this requirement, you can make use of the `selectable` and `selected` props on each `ld-table-row` component (for individual selection).

#### Default selection

As long as the table is not displaying dynamic data (i.e. you have not set up custom sorting or a pagination) the default selection just works and the only thing you have to do is to hook up your event listeners to the `ldTableSelect` and `ldTableSelectAll` events.

{% example '{ "stacked": true }' %}
<style>
  .periodic-table { max-height: 26rem; }
  .periodic-table :is(ld-table-header, ld-table-cell):is(:nth-child(1), :nth-child(n+4)) {
    text-align: right;
  }
</style>
<div id="example-selection"></div>
<script type="module">
  import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.prod.js'
  const app = createApp({
    data() {
      return {
        elements: null,
      }
    },
    async created() {
      try {
        const data = await fetch('{{ env.base }}/{{ buildstamp }}assets/examples/periodicTable.json').then((res) => res.json())
        this.elements = data.elements
      } catch (err) {
        console.error(err)
      }
    },
    methods: {
      toFixed(value, digits) {
        return typeof value === 'number' ? value.toFixed(digits) : '-'
      },
    },
    template: `
      <ld-table class="periodic-table">
        <ld-table-toolbar slot="toolbar">
          <ld-table-caption>
            Periodic table
          </ld-table-caption>
        </ld-table-toolbar>
        <ld-table-head>
          <ld-table-row selectable>
            <ld-table-header sortable>#</ld-table-header>
            <ld-table-header sortable>Name</ld-table-header>
            <ld-table-header sortable>Symbol</ld-table-header>
            <ld-table-header sortable>Atomic mass</ld-table-header>
            <ld-table-header sortable>Electronegativity</ld-table-header>
            <ld-table-header sortable>Density</ld-table-header>
          </ld-table-row>
        </ld-table-head>
        <ld-table-body>
          <template v-if="!elements">
            <ld-table-row>
              <ld-table-cell colspan="7" style="text-align: center">
                <ld-loading></ld-loading>
              </ld-table-cell>
            </ld-table-row>
          </template>
          <template v-else>
            <ld-table-row v-for="element in elements" selectable>
              <ld-table-cell>\{\{element.number\}\}</ld-table-cell>
              <ld-table-cell>\{\{element.name\}\}</ld-table-cell>
              <ld-table-cell>\{\{element.symbol\}\}</ld-table-cell>
              <ld-table-cell>\{\{toFixed(element.atomic_mass, 10)\}\}</ld-table-cell>
              <ld-table-cell>\{\{toFixed(element.electronegativity_pauling, 2)\}\}</ld-table-cell>
              <ld-table-cell>\{\{toFixed(element.density, 2)\}\}</ld-table-cell>
            </ld-table-row>
          </template>
        </ld-table-body>
      </ld-table>`,
  })
  app.config.compilerOptions.isCustomElement = (tag) => tag.startsWith('ld-')
  app.mount('#example-selection')
</script>

<!-- React component -->

const [elements, setElements] = useState([])

useEffect(() => {
  fetch('assets/examples/periodicTable.json')
    .then((res) => res.json())
    .then((data) => {
      setElements(data.elements)
    })
}, [])

function toFixed(value, digits) {
  return typeof value === 'number' ? value.toFixed(digits) : '-'
}

return (
  <LdTable style={ { maxHeight: '26rem' } }>
    <LdTableToolbar slot="toolbar">
      <LdTableCaption>
        Periodic table
      </LdTableCaption>
    </LdTableToolbar>
    <LdTableHead>
      <LdTableRow selectable>
        <LdTableHeader sortable style={ { textAlign: 'right' } }>#</LdTableHeader>
        <LdTableHeader sortable>Name</LdTableHeader>
        <LdTableHeader sortable>Symbol</LdTableHeader>
        <LdTableHeader sortable style={ { textAlign: 'right' } }>Atomic mass</LdTableHeader>
        <LdTableHeader sortable style={ { textAlign: 'right' } }>Electronegativity</LdTableHeader>
        <LdTableHeader sortable style={ { textAlign: 'right' } }>Density</LdTableHeader>
      </LdTableRow>
    </LdTableHead>
    <LdTableBody>
      {elements.length > 0 ? (
        elements.map((element, index) => (
          <LdTableRow selectable key={element.number}>
            <LdTableCell style={ { textAlign: 'right' } }>{element.number}</LdTableCell>
            <LdTableCell>{element.name}</LdTableCell>
            <LdTableCell>{element.symbol}</LdTableCell>
            <LdTableCell style={ { textAlign: 'right' } }>{toFixed(element.atomic_mass, 10)}</LdTableCell>
            <LdTableCell style={ { textAlign: 'right' } }>{toFixed(element.electronegativity_pauling, 2)}</LdTableCell>
            <LdTableCell style={ { textAlign: 'right' } }>{toFixed(element.density, 2)}</LdTableCell>
          </LdTableRow>
        ))
      ) : (
        <LdTableRow>
          <LdTableCell colspan={6} style={ { textAlign: 'center' } }>
            <LdLoading />
          </LdTableCell>
        </LdTableRow>
      )}
    </LdTableBody>
  </LdTable>
)

{% endexample %}

#### Custom selection

Like with custom sorting, you can prevent the default selection functionality and use your own custom selection mechanism by listening to the <code>ldTableSelect</code> and the <code>ldTableSelectAll</code> events.

Please refer to the <a href="/components/ld-table/#pagination">pagination reference</a> for an example implementation of custom selection.

### Pagination

A table pagination is a usefull feature for large data sets, where scrolling becomes cumbersome and displaying the data on separate pages makes more sense.

The following example shows how to use the [`ld-pagination`](/components/ld-pagination) component within the [`ld-table-toolbar`](/components/ld-table/ld-table-toolbar) component.

{% example '{ "stacked": true }' %}
<style>
  .periodic-table-with-pagination { max-height: 26rem; }
  .periodic-table-with-pagination :is(ld-table-header, ld-table-cell):is(:nth-child(1), :nth-child(n+4)) {
    text-align: right;
  }
  .periodic-table-with-pagination ld-table-header:nth-child(2) {
    min-width: 7rem;
  }
  .periodic-table-with-pagination ld-table-header:nth-child(4) {
    min-width: 8rem;
  }
</style>
<div id="example-pagination"></div>
<script type="module">
  import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.prod.js'
  const app = createApp({
    data() {
      return {
        elements: [],
        currentPage: 0,
        rowsPerPage: 6,
        sortOrder: null,
      }
    },
    computed: {
      allSelected() {
        return this.totalSelected === this.elements.length
      },
      elementsInPage() {
        return this.elementsSorted.slice(this.currentPage * this.rowsPerPage, this.currentPage * this.rowsPerPage + this.rowsPerPage)
      },
      elementsSorted() {
        if (!this.elements || !this.sortOrder) return this.elements
        return [...this.elements].sort((a, b) => {
          const key = ['number', 'name', 'symbol', 'atomic_mass', 'electronegativity_pauling', 'density'][this.sortOrder.columnIndex]
          const val1 = (this.sortOrder.sortOrder === 'asc' ? a : b)[key]
          const val2 = (this.sortOrder.sortOrder === 'asc' ? b : a)[key]
          const str1 = typeof val1 === 'number' ? val1.toString() : (val1 || '')
          const str2 = typeof val2 === 'number' ? val2.toString() : (val2 || '')
          const num1 = parseFloat(str1.replaceAll(/,/g, ''))
          const num2 = parseFloat(str2.replaceAll(/,/g, ''))
          if (!isNaN(num1) && !isNaN(num2)) {
            return num1 - num2
          }
          return str1.localeCompare(str2)
        })
      },
      someSelected() {
        return this.totalSelected > 0 && this.totalSelected < this.elements.length
      },
      totalPages() {
        return Math.ceil(this.elements.length / this.rowsPerPage) || Infinity
      },
      totalSelected() {
        return this.elements.filter(el => el.selected).length
      },
    },
    async created() {
      try {
        const data = await fetch('{{ env.base }}/{{ buildstamp }}assets/examples/periodicTable.json').then((res) => res.json())
        this.elements = data.elements
      } catch (err) {
        console.error(err)
      }
    },
    methods: {
      onPageChange(ev) {
        this.currentPage = ev.detail
      },
      onSort(ev) {
        this.currentPage = 0
        this.sortOrder = ev.detail
      },
      onSelect(ev) {
        this.elementsInPage[ev.detail.rowIndex].selected = ev.detail.selected
      },
      onSelectAll(ev) {
        for (let i = this.elements.length; i--;) {
          this.elements[i].selected = ev.detail.selected
        }
      },
      toFixed(value, digits) {
        return typeof value === 'number' ? value.toFixed(digits) : '-'
      },
    },
    template: `
      <ld-table
        class="periodic-table-with-pagination"
        v-on:ldTableSort.capture.prevent="onSort"
        v-on:ldTableSelect.capture.prevent="onSelect"
        v-on:ldTableSelectAll.capture.prevent="onSelectAll"
      >
        <ld-table-toolbar slot="toolbar">
          <ld-table-caption>
            Periodic table
          </ld-table-caption>
          <template v-if="totalPages">
            <ld-pagination
              offset="1"
              size="sm"
              style="margin-left: auto"
              v-on:ldchange="onPageChange"
              v-bind:length="totalPages"
              v-bind:selected-index="currentPage">
            </ld-pagination>
          </template>
        </ld-table-toolbar>
        <ld-table-head>
          <ld-table-row
            selectable
            v-bind:selected="allSelected"
            v-bind:indeterminate="someSelected"
          >
            <ld-table-header sortable>#</ld-table-header>
            <ld-table-header sortable>Name</ld-table-header>
            <ld-table-header sortable>Symbol</ld-table-header>
            <ld-table-header sortable>Atomic mass</ld-table-header>
            <ld-table-header sortable>Electronegativity</ld-table-header>
            <ld-table-header sortable>Density</ld-table-header>
          </ld-table-row>
        </ld-table-head>
        <ld-table-body>
          <template v-if="!elements.length">
            <ld-table-row>
              <ld-table-cell colspan="7" style="text-align: center">
                <ld-loading></ld-loading>
              </ld-table-cell>
            </ld-table-row>
          </template>
          <template v-else>
            <template v-for="(element, rowIndex) in elementsInPage">
              <ld-table-row
                selectable
                v-bind:selected="element.selected"
              >
                <ld-table-cell>\{\{element.number\}\}</ld-table-cell>
                <ld-table-cell>\{\{element.name\}\}</ld-table-cell>
                <ld-table-cell>\{\{element.symbol\}\}</ld-table-cell>
                <ld-table-cell>\{\{toFixed(element.atomic_mass, 10)\}\}</ld-table-cell>
                <ld-table-cell>\{\{toFixed(element.electronegativity_pauling, 2)\}\}</ld-table-cell>
                <ld-table-cell>\{\{toFixed(element.density, 2)\}\}</ld-table-cell>
              </ld-table-row>
            </template>
          </template>
        </ld-table-body>
      </ld-table>`,
  })
  app.config.compilerOptions.isCustomElement = (tag) => tag.startsWith('ld-')
  app.mount('#example-pagination')
</script>

<!-- React component -->

const [elements, setElements] = useState([])
const [currentPage, setCurrentPage] = useState(0)
const [rowsPerPage] = useState(6)
const [sortOrder, setSortOrder] = useState(null)

useEffect(() => {
  fetch('assets/examples/periodicTable.json')
    .then((res) => res.json())
    .then((data) => {
      setElements(data.elements)
    })
}, [])

const elementsSorted = useMemo(() => {
  if (!elements || !sortOrder) return elements

  return [...elements].sort((a, b) => {
    const key = [
      'number',
      'name',
      'symbol',
      'atomic_mass',
      'electronegativity_pauling',
      'density',
    ][sortOrder.columnIndex]
    const val1 = (sortOrder.sortOrder === 'asc' ? a : b)[key]
    const val2 = (sortOrder.sortOrder === 'asc' ? b : a)[key]
    const str1 = typeof val1 === 'number' ? val1.toString() : val1 || ''
    const str2 = typeof val2 === 'number' ? val2.toString() : val2 || ''
    const num1 = parseFloat(str1.replaceAll(/,/g, ''))
    const num2 = parseFloat(str2.replaceAll(/,/g, ''))
    if (!isNaN(num1) && !isNaN(num2)) {
      return num1 - num2
    }
    return str1.localeCompare(str2)
  })
}, [elements, sortOrder])

const elementsInPage = useMemo(() => {
  return elementsSorted.slice(
    currentPage * rowsPerPage,
    currentPage * rowsPerPage + rowsPerPage
  )
}, [elementsSorted, currentPage, rowsPerPage])

const totalSelected = useMemo(() => {
  return elements.filter((e) => e.selected).length
}, [elements])

const allSelected = useMemo(() => {
  return totalSelected === elements.length
}, [elements, totalSelected])

const someSelected = useMemo(() => {
  return totalSelected > 0 && totalSelected < elements.length
}, [elements, totalSelected])

const totalPages = useMemo(() => {
  return Math.ceil(elements.length / rowsPerPage) || Infinity
}, [elements, rowsPerPage])

const tableRef = useRef()

function onPageChange(ev) {
  setCurrentPage(ev.detail)
}

function onSort(ev) {
  setCurrentPage(0)
  setSortOrder(ev.detail)
}

const onSelect = useCallback(
  (ev) => {
    const elementNumber = elementsInPage[ev.detail.rowIndex].number
    const updatedElements = elements.map((e) => {
      return {
        ...e,
        selected:
          e.number === elementNumber ? ev.detail.selected : e.selected,
      }
    })
    setElements(updatedElements)
  },
  [elementsInPage, elements]
)

const onSelectAll = useCallback(
  (ev) => {
    const updatedElements = elements.map((e) => {
      return {
        ...e,
        selected: ev.detail.selected,
      }
    })
    setElements(updatedElements)
  },
  [elements]
)

useEffect(() => {
  if (!tableRef.current) return
  tableRef.current.addEventListener('ldTableSort', onSort, true)

  return () => {
    tableRef.current.removeEventListener('ldTableSort', onSort, true)
  }
}, [onSort])

function toFixed(value, digits) {
  return typeof value === 'number' ? value.toFixed(digits) : '-'
}

return (
  <LdTable ref={tableRef} style={ { maxHeight: '26rem' } }>
    <LdTableToolbar slot="toolbar">
      <LdTableCaption>Periodic table</LdTableCaption>
      {totalPages && (
        <LdPagination
          offset={1}
          size="sm"
          style={ { marginLeft: 'auto' } }
          length={totalPages}
          selectedIndex={currentPage}
          onLdchange={onPageChange}
        ></LdPagination>
      )}
    </LdTableToolbar>
    <LdTableHead>
      <LdTableRow
        selectable
        selected={allSelected}
        indeterminate={someSelected}
        onLdTableSelectAll={onSelectAll}
      >
        <LdTableHeader sortable style={ { textAlign: 'right' } }>
          #
        </LdTableHeader>
        <LdTableHeader sortable>Name</LdTableHeader>
        <LdTableHeader sortable>Symbol</LdTableHeader>
        <LdTableHeader sortable style={ { textAlign: 'right' } }>
          Atomic mass
        </LdTableHeader>
        <LdTableHeader sortable style={ { textAlign: 'right' } }>
          Electronegativity
        </LdTableHeader>
        <LdTableHeader sortable style={ { textAlign: 'right' } }>
          Density
        </LdTableHeader>
      </LdTableRow>
    </LdTableHead>
    <LdTableBody>
      {elementsInPage.length > 0 ? (
        elementsInPage.map((element, index) => (
          <LdTableRow
            selectable
            selected={element.selected}
            onLdTableSelect={onSelect}
            key={element.number}
          >
            <LdTableCell style={ { textAlign: 'right' } }>
              {element.number}
            </LdTableCell>
            <LdTableCell>{element.name}</LdTableCell>
            <LdTableCell>{element.symbol}</LdTableCell>
            <LdTableCell style={ { textAlign: 'right' } }>
              {toFixed(element.atomic_mass, 10)}
            </LdTableCell>
            <LdTableCell style={ { textAlign: 'right' } }>
              {toFixed(element.electronegativity_pauling, 2)}
            </LdTableCell>
            <LdTableCell style={ { textAlign: 'right' } }>
              {toFixed(element.density, 2)}
            </LdTableCell>
          </LdTableRow>
        ))
      ) : (
        <LdTableRow>
          <LdTableCell colspan={6} style={ { textAlign: 'center' } }>
            <LdLoading />
          </LdTableCell>
        </LdTableRow>
      )}
    </LdTableBody>
  </LdTable>
)

{% endexample %}

<!-- Auto Generated Below -->


## Properties

| Property | Attribute | Description                                              | Type               | Default     |
| -------- | --------- | -------------------------------------------------------- | ------------------ | ----------- |
| `key`    | `key`     | for tracking the node's identity when working with lists | `string \| number` | `undefined` |
| `ref`    | `ref`     | reference to component                                   | `any`              | `undefined` |


## Events

| Event              | Description                                                    | Type                                                                |
| ------------------ | -------------------------------------------------------------- | ------------------------------------------------------------------- |
| `ldTableSelect`    | Emitted from ld-table-row with row index and selected state.   | `CustomEvent<{ rowIndex: number; selected: boolean; }>`             |
| `ldTableSelectAll` | Emitted from ld-table-row with selected state.                 | `CustomEvent<{ selected: boolean; }>`                               |
| `ldTableSort`      | Emitted from ld-table-header with culumn index and sort order. | `CustomEvent<{ columnIndex: number; sortOrder: "desc" \| "asc"; }>` |


## Shadow Parts

| Part                 | Description                                     |
| -------------------- | ----------------------------------------------- |
| `"scroll-container"` | the scroll-container wrapping the table element |
| `"table"`            | the table element                               |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
