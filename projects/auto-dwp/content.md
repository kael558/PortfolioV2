# Automated Data Wrangling Pipeline

## Background 

Excel VBA (Visual Basic for Applications) is a programming language for Microsoft Excel that enables users to automate tasks and create custom-defined functions, user forms, and macros within the Excel environment. It allows users to automate repetitive tasks, create custom functions, and manipulate data and elements of an Excel spreadsheet.

I developed this program independently and sold it to management.

## Problem Statement 

The Parking Operations Department of the City of Ottawa collects data on car occupancy at various locations by tracking license plate numbers. This data is analyzed to determine retention and churn, and is used to inform decisions regarding car capacity and parking conditions.

The data collection was done in Excel and the analysis pipeline was performed manually, taking an average of 4 hours to complete. The pipeline consisted of several steps and resulted in a report with key insights. However, there were slight variations in the raw data excel sheets, such as differences in cell colors, merged/unmerged cells, and cells with non-aggregatable data.

My goal was to automate the pipeline completely to eliminate the error prone manual process and save significant time.

## Implementation 

The macro was written in Excel VBA and can be initiated by the user clicking on it in the raw data sheet.

The code opens an options box where the user can specify cells to exclude from the data aggregation process.

The VBA code transforms the raw data into the first stage of the analysis pipeline, accommodating both merged and unmerged rows, and can work with a range of colors.

An instruction manual, explaining how to use the program and the function of each part of the code, is provided for anyone who wishes to modify it to meet their specific needs.
