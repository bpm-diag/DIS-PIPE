(define (problem Align) (:domain Mining)
(:objects
p_3 - place
p_6 - place
source - place
sink - place
p_4 - place
p_5 - place
p_7 - place
p_8 - place
p_9 - place
ev1 - event
ev2 - event
ev3 - event
ev4 - event
ev5 - event
ev6 - event
ev7 - event
ev8 - event
ev9 - event
ev10 - event
ev11 - event
ev12 - event
ev13 - event
ev14 - event
ev15 - event
ev16 - event
ev17 - event
ev18 - event
ev19 - event
ev20 - event
ev21 - event
ev22 - event
ev23 - event
ev24 - event
ev25 - event
ev26 - event
ev27 - event
ev28 - event
ev29 - event
ev30 - event
ev31 - event
ev32 - event
ev33 - event
ev34 - event
ev35 - event
ev36 - event
ev37 - event
ev38 - event
ev39 - event
ev40 - event
ev41 - event
ev42 - event
evEND - event
)
(:init
(tracePointer ev1)
(allowed)
(token source)
(= (total-cost) 0)
)
(:goal
(and
(not (token p_3))
(not (token p_6))
(not (token source))
(token sink)
(not (token p_4))
(not (token p_5))
(not (token p_7))
(not (token p_8))
(not (token p_9))
(tracePointer evEND)
))
(:metric minimize (total-cost))
)