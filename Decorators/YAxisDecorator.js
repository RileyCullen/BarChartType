// Cullen, Riley
// YAxisDecorator.js
// October 8, 2020

class YAxisDecorator extends ABarChartDecorator
{
    /**
     * @summary     This type is a concrete decorator that adds a y-axis to the 
     *              bar chart. 
     * @description This class adds a y-axis line, tick marks, and tick labels
     *              to the given bar chart (or decorator).
     * 
     * @requires ABarChartDecorator.js
     * 
     * @see ABarChartDecorator.js
     * 
     * @param {BarChart}   chart           : This type is a concrete bar chart (or decorator)
     *                                       that we plan on decorating.
     * @param {string}     lineColor       : The color of the axis and its tick marks
     * @param {int}        lineStrokeWidth : width of the x-axis
     * @param {int}        tickStrokeWidth : width of the x-axis ticks
     * @param {JSON Array} font            : determines font size and font family
     */
    constructor(chart, lineColor = 'black', lineStrokeWidth = 1, tickStrokeWidth = 0.5,
        font = {'fontSize' : 8, 'fontFamily' : 'Times New Roman, Times, serif', 'textColor' : 'black'})
    {
        super(chart);
        this._lineColor = lineColor;
        this._lineStrokeWidth = lineStrokeWidth;
        this._tickStrokeWidth = tickStrokeWidth;
        this._font = font;
    }

    CreateBarChart()
    {
        /**
         * @summary     This function adds an y-axis to give BarChart type.
         * @description This function calls _chart's CreateBarChart function
         *              as well as the _CreateYAxis function.
         */
        this._chart.CreateBarChart();
        this._CreateYAxis();
    }

    _CreateYAxis()
    {
        /**
         * @summary     This function adds a y-axis to the given BarChart type.
         * @description This function creates a y-axis by calling _CreateAxis
         *              and _AddTicks.
         */
        this._CreateAxis();
        this._AddTicks();
    }

    _CreateAxis()
    {
        /**
         * @summary     This function adds the base line of the y-axis.
         * @description This function creates Konva.Line object to represent the
         *              y-axis and adds it to the given Konva.Group.
         */
        var yAxis = new Konva.Line({
            points: [0, 0, 0, this._chartHeight],
            stroke: this._lineColor,
            strokeWidth: this._lineStrokeWidth,
        });
        this._group.add(yAxis); 
    }

    _AddTicks()
    {
        /**
         * @summary     This function adds the tick marks and labels to the y-axis.
         * @description This function iterates through the yScale's range yTick 
         *              times and assigns each of those ticks a numeric value. 
         *              These tick marks and corresponding tick mark values are 
         *              added to the Konva.Group.
         */
        var yTicks = this._yScale.ticks(10);
        yTicks.forEach(d => {
            this._group.add(new Konva.Line({
                points: [0, this._yScale(d) - 0.5, -6, this._yScale(d) - 0.5],
                stroke: this._lineColor,
                strokeWidth: this._tickStrokeWidth,
            }));
            this._group.add(new Konva.Text({
                text: d,
                fontSize: this._font.fontSize,
                fontFamily: this._font.fontFamily,
                x: -15,
                y: this._yScale(d) - 5,
            }));
        });
    }
}