(define (problem Align) (:domain Mining)
(:objects
p_10 - place
p_11 - place
p_13 - place
source - place
p_3 - place
p_5 - place
sink - place
p_4 - place
p_6 - place
p_7 - place
ev1 - event
ev2 - event
ev3 - event
ev4 - event
ev5 - event
ev6 - event
ev7 - event
ev8 - event
ev9 - event
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
(not (token p_10))
(not (token p_11))
(not (token p_13))
(not (token source))
(not (token p_3))
(not (token p_5))
(token sink)
(not (token p_4))
(not (token p_6))
(not (token p_7))
(tracePointer evEND)
))
(:metric minimize (total-cost))
)