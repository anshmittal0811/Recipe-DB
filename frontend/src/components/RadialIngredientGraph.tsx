import React, { useEffect, useRef, useState, useMemo } from "react";
// @ts-ignore
import * as d3 from "d3";
import { useIngredients } from "../hooks/useIngredients";

const RadialIngredientGraph = () => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [focusedCategory, setFocusedCategory] = useState<string | null>(null);
  
  // Use React Query hook for ingredients data
  const { data: ingredientData = [], isLoading: loading, error } = useIngredients();

  const width = 1000;
  const height = 800;
  const centerX = width / 2;
  const centerY = height / 2;
  const outerRadius = 100;
  const radius = 250;
  const verticalSpacing = 28;



  // Extract unique categories from API data
  const categories = useMemo(() => {
    // Create a map to normalize categories (case-insensitive)
    const categoryMap = new Map<string, string>();
    
    ingredientData.forEach(item => {
      const normalizedCategory = item.category.toLowerCase();
      // Use the first occurrence's original case as the standard
      if (!categoryMap.has(normalizedCategory)) {
        categoryMap.set(normalizedCategory, item.category);
      }
    });
    
    return Array.from(categoryMap.values()).sort();
  }, [ingredientData]);

  // Helper function to create safe IDs for DOM elements
  const createSafeId = (str: string): string => {
    if (!str) return '';
    const safeId = str
      .replace(/['"`]/g, '') // Remove quotes and apostrophes
      .replace(/[^a-zA-Z0-9\s-]/g, '') // Remove special characters except spaces and hyphens
      .replace(/\s+/g, '-') // Replace spaces with hyphens
      .toLowerCase();
    console.log(`Original: "${str}" -> Safe ID: "${safeId}"`);
    return safeId;
  };

  // Transform API data to match the expected format
  const ingredients = useMemo(() => 
    ingredientData.map(item => ({
      id: item.ingredient,
      category: item.category
    }))
  , [ingredientData]);

  const links = ingredients.map((i) => ({
    source: i.id,
    target: i.category,
  }));

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();
    svg.attr("viewBox", [0, 0, width, height]);

    interface Node {
      id: string;
      x: number;
      y: number;
      category?: string;
    }

    interface Link {
      source: Node;
      target: Node;
    }

    let ingredientNodes: any[] = [];
    let categoryNodes: any[] = [];
    let visibleLinks: any[] = [];

    if (!focusedCategory) {
      const left = ingredients.filter((_, i) => i % 2 === 0);
      const right = ingredients.filter((_, i) => i % 2 !== 0);

      ingredientNodes = [
        ...left.map((d, i) => {
          const angle = (i - 35) * 0.035;
          return {
            id: d.id,
            category: d.category,
            x: centerX - (radius + 90) * Math.cos(angle),
            y: centerY - radius * Math.sin(angle),
          };
        }),
        ...right.map((d, i) => {
          const angle = (-i + 35) * 0.035;
          return {
            id: d.id,
            category: d.category,
            x: centerX + (radius + 90) * Math.cos(angle),
            y: centerY - radius * Math.sin(angle),
          };
        }),
      ];

      categoryNodes = categories.map((cat, i) => ({
        id: cat,
        x: centerX,
        y:
          centerY -
          (categories.length * verticalSpacing) / 2 +
          i * verticalSpacing,
      }));

      visibleLinks = links
        .map((l) => {
          const source = ingredientNodes.find((n) => n.id === l.source);
          const target = categoryNodes.find((n) => n.id === l.target);
          return source && target ? { source, target } : null;
        })
        .filter((link): link is Link => link !== null);
    } else {
      const filtered = ingredients.filter(
        (i) => i.category.toLowerCase() === focusedCategory.toLowerCase()
      );
      const angleStep = (2 * Math.PI) / filtered.length;

      ingredientNodes = filtered.map((d, i) => {
        const angle = i * angleStep - Math.PI / 2;
        return {
          id: d.id,
          category: d.category,
          x: centerX + outerRadius * Math.cos(angle),
          y: centerY + outerRadius * Math.sin(angle),
        };
      });

      categoryNodes = [{ id: focusedCategory, x: centerX, y: centerY }];

      visibleLinks = filtered.map((i) => ({
        source: ingredientNodes.find((n) => n.id === i.id),
        target: categoryNodes[0],
      }));
    }

    // Draw links
    svg
      .append("g")
      .selectAll("line")
      .data(visibleLinks, (d: any) => d.source.id + "-" + d.target.id)
      .join("line")
      .attr(
        "id",
        (d: any) =>
          `link-${createSafeId(d.source.id)}-${createSafeId(d.target.id)}`
      )
      .attr("stroke", "#ccc")
      .attr("stroke-opacity", 0.6)
      .attr("stroke-width", 1)
      .attr("x1", centerX)
      .attr("y1", centerY)
      .attr("x2", centerX)
      .attr("y2", centerY)
      .transition()
      .duration(600)
      .attr("x1", (d: any) => d.source.x)
      .attr("y1", (d: any) => d.source.y)
      .attr("x2", (d: any) => d.target.x)
      .attr("y2", (d: any) => d.target.y);

    // Ingredient nodes
    const ig = svg
      .append("g")
      .selectAll("g")
      .data(ingredientNodes, (d: any) => d.id)
      .join("g")
      .attr("id", (d: any) => `ingredient-${createSafeId(d.id)}`)
      .style("cursor", "pointer")
      .on("mouseenter", (_: any, d: any) => {
        const iid = createSafeId(d.id);
        const cid = createSafeId(d.category);

        const ingredientElement = d3.select(`#ingredient-${iid}`);
        const categoryElement = d3.select(`#category-${cid}`);
        const linkElement = d3.select(`#link-${iid}-${cid}`);

        if (!ingredientElement.empty()) {
          ingredientElement.select("circle").attr("fill", "#ff6347");
        }
        if (!categoryElement.empty()) {
          categoryElement.select("rect").attr("fill", "#ffd700");
        }
        if (!linkElement.empty()) {
          linkElement.attr("stroke", "#ff6347").attr("stroke-width", 2);
        }
      })
      .on("mouseleave", (_: any, d: any) => {
        const iid = createSafeId(d.id);
        const cid = createSafeId(d.category);

        const ingredientElement = d3.select(`#ingredient-${iid}`);
        const categoryElement = d3.select(`#category-${cid}`);
        const linkElement = d3.select(`#link-${iid}-${cid}`);

        if (!ingredientElement.empty()) {
          ingredientElement.select("circle").attr("fill", "#171543");
        }
        if (!categoryElement.empty()) {
          categoryElement.select("rect").attr("fill", "#c1f824");
        }
        if (!linkElement.empty()) {
          linkElement.attr("stroke", "#ccc").attr("stroke-width", 1);
        }
      });

    ig.transition()
      .duration(600)
      .attr("opacity", 1)
      .attr("fill", "#171543")
      .attr("transform", (d: any) => `translate(${d.x},${d.y})`);


    ig.each(function (this: any, d: any) {
      const g = d3.select(this);
      g.append("circle").attr("r", 5).attr("fill", "#171543");

      // Calculate angle for text rotation
      const angle = Math.atan2(d.y - centerY, d.x - centerX) * (180 / Math.PI);
      
      // Determine text positioning based on whether ingredient is on left or right side
      const isLeftSide = d.x < centerX;
      const textAnchor = isLeftSide ? "end" : "start";
      const dx = isLeftSide ? -10 : 10;
      const rotationAngle = isLeftSide ? angle + 180 : angle;
      
      g.append("text")
        .text(d.id.charAt(0).toUpperCase() + d.id.slice(1))
        .attr("font-size", "10px")
        .attr("font-weight", "bold")
        .attr("fill", "#171543")
        .attr("text-anchor", textAnchor)
        .attr("alignment-baseline", "middle")
        .attr("dx", dx)
        .attr("transform", `rotate(${rotationAngle})`);
    });

    // Category nodes
    const cg = svg
      .append("g")
      .selectAll("g")
      .data(categoryNodes, (d: any) => d.id)
      .join("g")
      .attr("id", (d: any) => `category-${createSafeId(d.id)}`)
      .style("cursor", "pointer")
      .on("mouseenter", (_: any, d: any) => {
        const cid = createSafeId(d.id);

        const categoryElement = d3.select(`#category-${cid}`);
        if (!categoryElement.empty()) {
          categoryElement.select("rect").attr("fill", "#ffd700");
        }

        ingredients
          .filter((i) => i.category.toLowerCase() === d.id.toLowerCase())
          .forEach((ing) => {
            const iid = createSafeId(ing.id);
            const ingredientElement = d3.select(`#ingredient-${iid}`);
            const linkElement = d3.select(`#link-${iid}-${cid}`);
            
            if (!ingredientElement.empty()) {
              ingredientElement.select("circle").attr("fill", "#ff6347");
            }
            if (!linkElement.empty()) {
              linkElement.attr("stroke", "#ff6347").attr("stroke-width", 2);
            }
          });
      })
      .on("mouseleave", (_: any, d: any) => {
        const cid = createSafeId(d.id);

        const categoryElement = d3.select(`#category-${cid}`);
        if (!categoryElement.empty()) {
          categoryElement.select("rect").attr("fill", "#c1f824");
        }

        ingredients
          .filter((i) => i.category.toLowerCase() === d.id.toLowerCase())
          .forEach((ing) => {
            const iid = createSafeId(ing.id);
            const ingredientElement = d3.select(`#ingredient-${iid}`);
            const linkElement = d3.select(`#link-${iid}-${cid}`);
            
            if (!ingredientElement.empty()) {
              ingredientElement.select("circle").attr("fill", "#171543");
            }
            if (!linkElement.empty()) {
              linkElement.attr("stroke", "#ccc").attr("stroke-width", 1);
            }
          });
      })
      .on("click", (_: any, d: any) => {
        setFocusedCategory(focusedCategory === d.id ? null : d.id);
      });

    cg.transition()
      .duration(600)
      .attr("transform", (d: any) => `translate(${d.x},${d.y})`);

    cg.each(function (this: any, d: any) {
      const g = d3.select(this);
      g.append("rect")
        .attr("x", focusedCategory ? -75 : -75)
        .attr("y", focusedCategory ? -75 : -12)
        .attr("width", focusedCategory ? 150 : 150)
        .attr("height", focusedCategory ? 150 : 24)
        .attr("rx", focusedCategory ? 150 : 10)
        .attr("ry", focusedCategory ? 150 : 10)
        .attr("fill", "#c1f824");

      g.append("text")
        .text(d.id.charAt(0).toUpperCase() + d.id.slice(1))
        .attr("fill", "black")
        .attr("text-anchor", "middle")
        .attr("alignment-baseline", "middle")
        .attr("font-weight", "bold")
        .attr("font-size", "12px");
    });
  }, [focusedCategory, categories, centerX, centerY, ingredients, links]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-lg">Loading ingredients...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-lg text-red-600">Error: {error.message}</div>
      </div>
    );
  }

  return (
    <svg
      ref={svgRef}
      key={`graph-${loading ? 'loading' : 'loaded'}-${ingredients.length}`}
    />
  );
};

export default RadialIngredientGraph;
