import QueryProcessor from "../../utils/QueryProcessor";
import "@testing-library/jest-dom";

describe("QueryProcessor", () => {
  test("should return a string", () => {
    const query = "test";
    const response: string = QueryProcessor(query);
    expect(typeof response).toBe("string");
  });

  test("should return shakespeare description", () => {
    const query = "shakespeare";
    const response: string = QueryProcessor(query);
    expect(response).toBe(
      "William Shakespeare (26 April 1564 - 23 April 1616) was an " +
        "English poet, playwright, and actor, widely regarded as the greatest " +
        "writer in the English language and the world's pre-eminent dramatist."
    );
  });

  test("should return name", () => {
    const query = "What is your name?";
    const response: string = QueryProcessor(query);
    expect(response).toBe("jess06");
  });

  describe("Andrew ID query", () => {
    const OLD_ENV = process.env;

    beforeEach(() => {
      jest.resetModules();
      process.env = { ...OLD_ENV };
    });

    afterAll(() => {
      process.env = OLD_ENV;
    });

    test("should return configured Andrew ID when env var is set", async () => {
      process.env.NEXT_PUBLIC_ANDREW_ID = "KhanAcademy";
      const response: string = QueryProcessor("What is your Andrew ID?");
      expect(response).toBe("KhanAcademy");
    });

    test("should handle variations in casing or spacing", async () => {
      process.env.NEXT_PUBLIC_ANDREW_ID = "KhanAcademy";
      expect(QueryProcessor("what is your andrewid?")).toBe("KhanAcademy");
      expect(QueryProcessor("Can you tell me your Andrew   ID please?")).toBe(
        "KhanAcademy"
      );
    });

    test("should return default placeholder when env var not set", async () => {
      delete process.env.NEXT_PUBLIC_ANDREW_ID;
      const response: string = QueryProcessor("What is your Andrew ID?");
      expect(response).toBe( "KhanAcademy");
    });
  });
});
