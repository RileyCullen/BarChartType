// Cullen, Riley
// XAxisDecorator.js
// October 10, 2020

class XAxisDecorator extends ABarChartDecorator
{
    /**
     * @summary     This type is a concrete decorator that adds a x-axis to the 
     *              bar chart. 
     * @description This class adds a x-axis line, tick marks, and tick labels
     *              to the given bar chart (or decorator).
     * 
     * @requires ABarChartDecorator.js
     * 
     * @see ABarChartDecorator.js
     * 
     * @param {BarChart} chart : This type is a concrete bar chart (or decorator)
     *                           that we plan on decorating.
     */
    constructor(chart)
    {
        super(chart);
    }

    CreateBarChart()
    {
        /**
         * @summary     This function adds an x-axis to the given BarChart type.
         * @description This function calls _chart's CreateBarChart method as well
         *              as _CreateXAxis.
         */
        this._chart.CreateBarChart();
        this._CreateXAxis();
    }

    _CreateXAxis()
    {
        /**
         * @summary     This function adds an x-axis to the given BarChart type.
         * @description This function creates an x-axis by calling _CreateAxis
         *              and _AddTicks.
         */
        this._CreateAxis();
        this._AddTicks();
    }

    _CreateAxis()
    {
        /**
         * @summary     This function adds a base line that represents the x-axis.
         * @description This function adds a line to the Konva.Group that will
         *              serve as the base for the x-axis.
         */
        this._group.add(new Konva.Line({
            points: [0, this._chartHeight, this._chartWidth, this._chartHeight],
            stroke: 'black',
            strokeWidth: 1,
        }));
    }

    _AddTicks()
    {
        /**
         * @summary     This function adds tick marks and labels to the x-axis.
         * @description This function iterates through all of the previously mapped
         *              values in the xScale's domain and assigns them a tick 
         *              mark. The tick mark and the name of the mapped value are
         *              then added to the Konva.Group.
         */
        var canvas = document.createElement('canvas');
        var ctx = canvas.getContext('2d');

        this._xScale.domain().forEach(d => {
            this._group.add(new Konva.Line({
                points: [this._xScale(d) + this._xScale.bandwidth() / 2, 
                    this._chartHeight, this._xScale(d) + this._xScale.bandwidth() / 2, 
                    this._chartHeight + 6],
                stroke: 'black',
                strokeWidth: 0.5,
            }));

            this._group.add(new Konva.Text({
                text: d,
                fontSize: 8,
                fontFamily: "Times New Roman, Times, serif",
                x: (this._xScale(d) + this._xScale.bandwidth() / 2) - (ctx.measureText(d).width / 2),
                y: this._chartHeight + 8,
            }));
        });
    }
}