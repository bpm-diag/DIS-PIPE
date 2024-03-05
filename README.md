<p align="center"><img width=50% src="https://github.com/DataCloud-project/DIS-PIPE/blob/main/DISPIPE_Logo_TransparentBackground_White.png"></p> 

<!---[![GitHub Issues](https://img.shields.io/github/issues/DataCloud-project/SIM-PIPE.svg)](https://github.com/DataCloud-project/SIM-PIPE/issues)--->

[![License](https://img.shields.io/badge/license-Apache2.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)

# DIS-PIPE

DIS-PIPE provides scalable integration of **process mining** techniques and **artificial intelligence** algorithms to learn the structure of **Big Data pipelines** by extracting, processing, and interpreting vast amounts of event data collected from several data sources. Furthermore, DIS-PIPE supports a variety of analytics techniques for visualizing the discovered pipelines together with detailed diagnostics information about their execution.

The tool includes a frontend with a GUI written in HTML, Javascript and CSS, and a backend that exposes a Python Flask web application to receive the results of pipeline discovery on the base of user inputs.

<p align="center">
    <img src="https://raw.githubusercontent.com/bpm-diag/DIS-PIPE/main/images/DisPipeArchitecture.png">
</p>

<!--- It employs *process mining* algorithms enhanced with *artificial intelligence* solutions to efficiently build the sequence flow and to learn all data flows and event-based conditions during their execution. In addition, it integrates the discovered pipelines with DEF-PIPE through user-friendly visual workbenches, such as flowcharts, statistics, and dashboards.
**DIS-PIPE-Discovery-And-Visualization** component provides a graphical user interface for importing event logs in the IEEE Standard for eXtensible Event Stream (XES) format and executing the functionalities by leveraging a drag-and-drop workbench. -->

In particular, the functionalities provided by DIS-PIPE include:

<!-- - *Event data extraction*: which analyzes data sources to detect the main constituents of a data pipeline execution [DONE]; -->
<!-- - *Segmentation*: which clusters together the events belonging to the same pipeline executions [DONE]; -->
<!-- - *Abstraction*: which reduces the complexity of the event data set by merging multiple events into larger ones [DONE]; -->
- *Filtering*: which removes potential outliers and infrequent events from the data set;
- *Pipeline discovery*: which learns the structure of a data pipeline by interpreting an event log generated by applying the previous functionalities over the event data set;
- *Pipeline map visualization*: providing an understandable flowchart view of a discovered pipeline, which facilitates the analysis of execution metrics, such as duration, frequent paths, or exceptional behaviors;
- *Event log analysis*: which enables inspecting the history of relevant pipeline executions collected in the event log and understanding specific aspects, including timeframe, variation, attributes, event relationships, and many more;
- *Conformance checking*: of the pipeline executions as observed into the event log with the organization’s business rules, policies, and regulations;
- *Anomaly detection*: which interprets the conformance checking outcomes signaling nonconforming deviations and providing repair solutions;
- *Dark data discovery*: which use the query functionality to give value to data involved in pipeline executions.


## Requirements
The code has been tested using an **Ubuntu** operating system with **Python 3.8.12**, **Java 11**, **GCC compiler**, **conda 4.10.3**. Other versions are not guaranteed to work properly.

### To install conda

Follow these links:
`<br />`
https://docs.conda.io/projects/conda/en/latest/user-guide/install/index.html
`<br />`
Or go directly to Miniconda: https://docs.conda.io/en/latest/miniconda.html

It should work also on Anaconda: https://docs.anaconda.com/anaconda/install/index.html

## Set Up before using the code

It is really suggested to use the already existing environment.
`<br />`
After downloading the file "environment.yml", open the terminal or an Anaconda Prompt, change directory to go to the location where the file is located and do the following steps:

1. Create the environment from the environment.yml file:

```
conda env create -f environment.yml
```

The first line of the yml file sets the new environment's name, in this case "pm4py_env"
`<br />`

2. Activate the new environment:

```
conda activate pm4py_env
```

3. Verify that the new environment was installed correctly:

```
conda env list
```

or

```
conda info --envs.
```

## To use the code

1. Open terminal or Anaconda Prompt.
2. Activate "pm4py_env".
3. Change directory to go in the "api" folder downloaded.
4. Run: ``python backend.py`` in terminal or prompt;
5. Go to your browser on http://127.0.0.1:7778/

## NOTE

If there is an error saying `<br />`
``from graphviz.dot import Digraph ImportError: cannot import name 'Digraph' from 'graphviz.dot' ``
`<br />` try changing the line 21 of file "gview.py" through path `<br />`
`` C:\Users\<username>\<miniconda3|anaconda3>\envs\pm4py_env2\lib\site-packages\pm4py\visualization\common\gview.py``
`<br />`with this line
`<br />` ``from graphviz import Digraph``

<!---# DIS-PIPE Event Log Manager
It provides dedicated *segmentation*, *abstraction*, and *filtering* functionalities to transform the (collected) event data into an interpretable event log by extrapolating relevant fragments for an effective pipeline discovery. We implemented **DIS-PIPE-Event-Log-Manager** as a standalone tool developed using Java SE 8, Python 3.9 and C.-->

## Deployment

The DIS-PIPE tool is deployed on a single host as shown in the figure below. From the browser is possible to access DIS-PIPE at the following link: https://195.231.61.196:7778/. As the request comes in the backend will process it and the user is able to perform the functionalities provided above.

<p align="center">
    <img src="https://raw.githubusercontent.com/DataCloud-project/DIS-PIPE/main/images/DIS-PIPE-online-deployment.png">
</p>

The ``exportPipeline(pipelineID)`` REST-API can be invoked at: http://195.231.61.196:7780/

## User Guide

See the [example](https://github.com/DataCloud-project/DIS-PIPE/tree/main/example) folder for instructions on how to run your first data pipeline discovery.

## Contributing

Before raising a pull request, please read our [contributing guide](https://github.com/DataCloud-project/DIS-PIPE/blob/main/CONTRIBUTING.MD).

## Core development team

* [Simone Agostinelli](https://github.com/SimoneONE)
* [Jacopo Rossi](https://github.com/JacopoRossi)
* [Andrea Marrella](https://github.com/and182)
* [Dario Benvenuti](https://github.com/d-benvenuti)

## License

DIS-PIPE is released as open source software under the [Apache License 2.0](https://www.apache.org/licenses/LICENSE-2.0).

[^1]: For further information how to create Web APIs with Python and Flask, please refer to the following link: https://programminghistorian.org/en/lessons/creating-apis-with-python-and-flask#setting-up .
    
[^2]: https://pm4py.fit.fraunhofer.de/ .
    
[^3]: Directly-Follows graphs are graphs where the nodes represent the events/activities in the log and directed edges are present between nodes if there is at least a trace in the log where the source event/activity is followed by the target event/activity. On top of these directed edges, it is easy to represent metrics like frequency (counting the number of times the source event/activity is followed by the target event/activity) and performance (some aggregation, for example, the mean, of time inter-lapsed between the two events/activities).
    
[^4]: https://unpkg.com/viz.js@1.8.0/viz.js .
